import React from 'react'
import { render, fireEvent, waitFor, waitForElementToBeRemoved, screen } from '@testing-library/react'
import { server } from '../../server'
import { rest } from 'msw'

import { NewCustomerPage } from "../../../pages/customers/new";

describe('NewCustomerPage Component test', () => {
    test('displays navigation links correctly', async () => {
        const mockRouter = {
            basePath: "/test-base-path",
            push: function(url) {
                return;
            }
        }
        render(<NewCustomerPage router={mockRouter} />);
        expect(screen.queryByTestId('home-link').getAttribute("href")).toBe('/test-base-path/');
        expect(screen.queryByTestId('list-customers-link').getAttribute("href")).toBe('/test-base-path/customers/list/');
    });

    test('cancel button', async () => {
        const mockRouter = {
            basePath: "",
            push: function(url) {
                expect(url).toBe("/customers/list/");
                return;
            }
        }
        render(<NewCustomerPage router={mockRouter} />);
        fireEvent.click(screen.getByTestId("cancel-button"))
    });

    test('new customer creation', async () => {
        const apiUrl = process.env.NEXT_PUBLIC_CUSTOMER_API_BASE_URL + "/customers"
        var requestJson = null;
        server.use(
            rest.post(apiUrl, (req, res, ctx) => {
                requestJson = req.body
                return res(
                    ctx.status(200),
                )
            }),
        );

        var redirectUrl = null;
        const mockRouter = {
            basePath: "",
            push: function(url) {
                redirectUrl = url;
                return;
            }
        }
        render(<NewCustomerPage router={mockRouter} />);
        expect(screen.queryByTestId('first-name').getAttribute("value")).toBe('');
        expect(screen.queryByTestId('last-name').getAttribute("value")).toBe('');

        fireEvent.change(screen.getByTestId("first-name"), { target: { value: 'test-first-name' } });
        fireEvent.change(screen.getByTestId("last-name"), { target: { value: 'test-last-name' } });
        fireEvent.click(screen.getByTestId("submit-button"))

        await waitFor(() => expect(redirectUrl).toBe('/customers/list/'));

        await waitFor(() => expect(requestJson).not.toBeNull());
        expect(requestJson.firstName).toBe('test-first-name');
        expect(requestJson.lastName).toBe('test-last-name');
    })
});