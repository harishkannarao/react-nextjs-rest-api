import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { server } from '../../server'
import { rest } from 'msw'

import { CustomersListPage } from "../../../pages/customers/list";

describe('CustomersListPage Component test', () => {
    test('displays data from api', async () => {
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
        server.use(
            rest.get(apiUrl, (req, res, ctx) => {
                return res(
                    ctx.status(200),
                    ctx.json(apiResponse),
                )
            }),
        );

        render(<CustomersListPage />)
        await screen.findByTestId('success-content');

        expect(screen.getAllByTestId('id')[0].textContent).toBe('1');
        expect(screen.getAllByTestId('firstName')[0].textContent).toBe('test-first-name-1');
        expect(screen.getAllByTestId('lastName')[0].textContent).toBe('test-last-name-1');

        expect(screen.getAllByTestId('id')[1].textContent).toBe('2');
        expect(screen.getAllByTestId('firstName')[1].textContent).toBe('test-first-name-2');
        expect(screen.getAllByTestId('lastName')[1].textContent).toBe('test-last-name-2');
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

        render(<CustomersListPage />)
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

        render(<CustomersListPage />);
        expect(screen.queryByTestId('initial-content').textContent).toContain('Loading...');
        await screen.findByTestId('error-content', {}, {'timeout': 2000});
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

        render(<CustomersListPage />);
        await screen.findByTestId('success-content');

        expect(screen.queryByTestId('home-link').getAttribute("href")).toBe('/');
        expect(screen.queryByTestId('new-customer-link').getAttribute("href")).toBe('/customers/new');
    });
});