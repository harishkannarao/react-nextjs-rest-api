import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { server } from '../../server'
import { rest } from 'msw'

import { CustomersListPage } from "../../../pages/customers/list";

describe('CustomersListPage Component test', () => {
    const { location } = window;

    beforeEach(() => {
        delete window.location;
        window.location = {
            href: 'https://www.example.com',
        };
    });

    afterEach(() => {
        window.location = location;
    });

    test('prefilling firstName search from query param', async () => {

        window.location = {
            href: 'https://www.example.com?firstName=test-first-name',
        };

        server.use(
            rest.get(process.env.NEXT_PUBLIC_CUSTOMER_API_BASE_URL + "/customers", (req, res, ctx) => {
                return res(
                    ctx.status(200),
                    ctx.json([]),
                )
            }),
        );

        const mockRouter = {
            pathname: '',
            query: {}
        }

        render(<CustomersListPage router={mockRouter} />);
        await screen.findByTestId('success-content');
        expect(screen.getByTestId('input-first-name').getAttribute('value')).toBe('test-first-name');
    });

    test('display customers filtered by first name from query', async () => { 
        window.location = {
            href: 'https://www.example.com?firstName=test-first-name',
        };

        var receivedFirstName = null;
        server.use(
            rest.get(process.env.NEXT_PUBLIC_CUSTOMER_API_BASE_URL + "/customers", (req, res, ctx) => {
                receivedFirstName = req.url.searchParams.get('firstName');
                return res(
                    ctx.status(200),
                    ctx.json(
                        [
                            {
                                id: 1,
                                firstName: 'test-first-name',
                                lastName: 'test-last-name'
                            }
                        ]
                    ),
                )
            }),
        );

        const mockRouter = {
            pathname: '',
            query: {}
        }

        render(<CustomersListPage router={mockRouter} />);

        await screen.findByTestId('success-content');
        expect(screen.getAllByTestId('id')[0].textContent).toBe('1');
        expect(receivedFirstName).toBe('test-first-name');
    })

    test('displays multiple customers from api', async () => {
        const apiUrl = process.env.NEXT_PUBLIC_CUSTOMER_API_BASE_URL + "/customers"
        const apiResponse = [
            {
                id: 1,
                firstName: 'test-first-name-1',
                lastName: 'test-last-name-1'
            },
            {
                id: 2,
                firstName: 'test-first-name-2',
                lastName: 'test-last-name-2'
            }
        ]
        var receivedRequest = null;
        server.use(
            rest.get(apiUrl, (req, res, ctx) => {
                receivedRequest = req;
                return res(
                    ctx.status(200),
                    ctx.json(apiResponse),
                )
            }),
        );

        const mockRouter = {
            pathname: '',
            query: {}
        }

        render(<CustomersListPage router={mockRouter} />)
        await screen.findByTestId('success-content');

        expect(screen.getAllByTestId('id')[0].textContent).toBe('1');
        expect(screen.getAllByTestId('firstName')[0].textContent).toBe('test-first-name-1');
        expect(screen.getAllByTestId('lastName')[0].textContent).toBe('test-last-name-1');

        expect(screen.getAllByTestId('id')[1].textContent).toBe('2');
        expect(screen.getAllByTestId('firstName')[1].textContent).toBe('test-first-name-2');
        expect(screen.getAllByTestId('lastName')[1].textContent).toBe('test-last-name-2');

        expect(Array.from(receivedRequest.url.searchParams.entries())).toHaveLength(0);
    });

    test('displays empty customers', async () => {
        server.use(
            rest.get(process.env.NEXT_PUBLIC_CUSTOMER_API_BASE_URL + "/customers", (req, res, ctx) => {
                return res(
                    ctx.status(200),
                    ctx.json([]),
                )
            }),
        );

        const mockRouter = {
            pathname: '',
            query: {}
        }

        render(<CustomersListPage router={mockRouter} />)
        await screen.findByTestId('success-content');
        expect(screen.queryByTestId('id')).toBeNull();
    });

    test('displays error from api', async () => {
        const apiUrl = process.env.NEXT_PUBLIC_CUSTOMER_API_BASE_URL + "/customers"
        const apiResponse = {
            'message': 'unit-test-error'
        }
        server.use(
            rest.get(apiUrl, (req, res, ctx) => {
                return res(
                    ctx.status(500),
                    ctx.json(apiResponse),
                )
            }),
        );

        const mockRouter = {
            pathname: '',
            query: {}
        }

        render(<CustomersListPage router={mockRouter} />)
        await screen.findByTestId('error-content');
        expect(screen.queryByTestId('error-content').textContent).toContain('unit-test-error');
        expect(screen.queryByTestId('error-content').textContent).toContain('Internal Server Error');
    });

    test('displays initial content when waiting for response from api', async () => {
        const apiUrl = process.env.NEXT_PUBLIC_CUSTOMER_API_BASE_URL + "/customers"
        const apiResponse = {
            'message': 'unit-test-error'
        }
        server.use(
            rest.get(apiUrl, (req, res, ctx) => {
                return res(
                    ctx.delay(1000),
                    ctx.status(500),
                    ctx.json(apiResponse),
                )
            }),
        );

        const mockRouter = {
            pathname: '',
            query: {}
        }

        render(<CustomersListPage router={mockRouter} />)
        expect(screen.queryByTestId('processing-content').textContent).toContain('Processing...');
        await screen.findByTestId('error-content', {}, { 'timeout': 2000 });
    });

    test('displays navigation links correctly', async () => {
        const apiUrl = process.env.NEXT_PUBLIC_CUSTOMER_API_BASE_URL + "/customers"
        server.use(
            rest.get(apiUrl, (req, res, ctx) => {
                return res(
                    ctx.status(200),
                    ctx.json([]),
                )
            }),
        );

        const mockRouter = {
            pathname: '',
            query: {}
        }

        render(<CustomersListPage router={mockRouter} />)
        await screen.findByTestId('success-content');

        expect(screen.queryByTestId('home-link').getAttribute("href")).toBe('/');
        expect(screen.queryByTestId('new-customer-link').getAttribute("href")).toBe('/customers/new');
    });

    test('customer deletion', async () => {
        var listCustomersCount = 0;
        var deleteRequestJson = null;
        server.use(
            rest.get(process.env.NEXT_PUBLIC_CUSTOMER_API_BASE_URL + "/customers", (req, res, ctx) => {
                listCustomersCount = listCustomersCount + 1;
                return res(
                    ctx.status(200),
                    ctx.json(
                        [
                            {
                                id: 1,
                                firstName: 'test-first-name-1',
                                lastName: 'test-last-name-1'
                            },
                            {
                                id: 2,
                                firstName: 'test-first-name-2',
                                lastName: 'test-last-name-2'
                            }
                        ]
                    ),
                )
            }),
            rest.delete(process.env.NEXT_PUBLIC_CUSTOMER_API_BASE_URL + "/customers", (req, res, ctx) => {
                deleteRequestJson = req.body
                return res(
                    ctx.delay(500),
                    ctx.status(200),
                )
            }),
        );

        const mockRouter = {
            pathname: '',
            query: {}
        }

        render(<CustomersListPage router={mockRouter} />)
        await screen.findByTestId('success-content');
        expect(listCustomersCount).toBe(1);

        fireEvent.click(screen.getAllByTestId("delete-button")[1]);
        await screen.findByTestId('processing-content');
        await waitFor(() => expect(screen.queryByTestId('processing-content')).toBeNull());

        await waitFor(() => expect(deleteRequestJson).not.toBeNull());
        expect(deleteRequestJson.id).toBe(2);

        expect(listCustomersCount).toBe(2);
    });

    test('display error during customer deletion', async () => {
        server.use(
            rest.get(process.env.NEXT_PUBLIC_CUSTOMER_API_BASE_URL + "/customers", (req, res, ctx) => {
                return res(
                    ctx.status(200),
                    ctx.json(
                        [
                            {
                                id: 1,
                                firstName: 'test-first-name-1',
                                lastName: 'test-last-name-1'
                            }
                        ]
                    ),
                )
            }),
            rest.delete(process.env.NEXT_PUBLIC_CUSTOMER_API_BASE_URL + "/customers", (req, res, ctx) => {
                return res(
                    ctx.status(500),
                    ctx.json({ 'message': 'unit-test-error' }),
                )
            }),
        );

        const mockRouter = {
            pathname: '',
            query: {}
        }

        render(<CustomersListPage router={mockRouter} />)
        await screen.findByTestId('success-content');

        fireEvent.click(screen.getAllByTestId("delete-button")[0]);

        await screen.findByTestId('error-content');
        expect(screen.queryByTestId('error-content').textContent).toContain('unit-test-error');

        server.use(
            rest.delete(process.env.NEXT_PUBLIC_CUSTOMER_API_BASE_URL + "/customers", (req, res, ctx) => {
                return res(
                    ctx.status(200),
                )
            }),
        );

        fireEvent.click(screen.getAllByTestId("delete-button")[0]);

        await screen.findByTestId('success-content');
        await waitFor(() => expect(screen.queryByTestId('error-content')).toBeNull());
        expect(screen.queryByTestId('id')).not.toBeNull();
    });
});