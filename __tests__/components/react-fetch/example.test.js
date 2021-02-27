import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import waitForExpect from 'wait-for-expect';
import { server } from '../../server'
import { rest } from 'msw'

import { Example } from "../../../components/react-fetch/example";

describe('Example Component test', () => {
    test('displays data from api', async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL+"/repos/tannerlinsley/react-query"
        const apiResponse = { 
            'name': 'unit-test-name',
            'description': 'unit-test-description',
            'subscribers_count': '200',
            'stargazers_count': '300',
            'forks_count': '200'
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
        await waitForExpect(() => {
            expect(screen.queryByTestId('name').textContent).toBe('unit-test-name')
        }, 2000, 50);
    });
});