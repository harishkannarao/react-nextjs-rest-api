import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { server } from '../../server'
import { rest } from 'msw'

import { NewCustomerPage } from "../../../pages/customers/new";

describe('NewCustomerPage Component test', () => {
    test('displays navigation links correctly', async () => {
        const mockRouter = {
            push: function(url) {
                return;
            }
        }
        render(<NewCustomerPage router={mockRouter} />);
        expect(screen.queryByTestId('home-link').getAttribute("href")).toBe('/');
        expect(screen.queryByTestId('list-customers-link').getAttribute("href")).toBe('/customers/list');
    });

    test('cancel button', async () => {
        const mockRouter = {
            push: function(url) {
                expect(url).toBe("/customers/list/");
                return;
            }
        }
        render(<NewCustomerPage router={mockRouter} />);
        fireEvent.click(screen.getByTestId("cancel-button"))
    });
});