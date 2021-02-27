import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { server } from '../../server'
import { rest } from 'msw'

import { Example } from "../../../components/react-fetch/example";

describe('Example Component test', () => {
    test('displays data from api', async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL + "/repos/tannerlinsley/react-query"
        const apiResponse = {
            'name': 'unit-test-name',
            'description': 'unit-test-description',
            'subscribers_count': '200',
            'stargazers_count': '300',
            'forks_count': '150'
        }
        server.use(
            rest.get(apiUrl, (req, res, ctx) => {
                return res(
                    ctx.status(200),
                    ctx.json(apiResponse),
                )
            }),
        );

        render(<Example />)
        await screen.findByTestId('success-content');
        expect(screen.queryByTestId('name').textContent).toBe('unit-test-name');
        expect(screen.queryByTestId('description').textContent).toBe('unit-test-description');
        expect(screen.queryByTestId('subscribers_count').textContent).toBe('200');
        expect(screen.queryByTestId('stargazers_count').textContent).toBe('300');
        expect(screen.queryByTestId('forks_count').textContent).toBe('150');
    });

    test('displays error from api', async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL + "/repos/tannerlinsley/react-query"
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

        render(<Example />)
        await screen.findByTestId('error-content');
        expect(screen.queryByTestId('error-content').textContent).toContain('unit-test-error');
        expect(screen.queryByTestId('error-content').textContent).toContain('Internal Server Error');
    });

    test('displays initial content when waiting for response from api', async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL + "/repos/tannerlinsley/react-query"
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

        render(<Example />);
        expect(screen.queryByTestId('initial-content').textContent).toContain('Loading...');
        await screen.findByTestId('error-content', {}, {'timeout': 2000});
    });
});