import React from 'react'
import { render, screen } from '@testing-library/react'

import { Stats } from "../../../components/react-fetch/stats";

describe('Example Stats Component test', () => {
    test('displays stats data', async () => {
        render(
            <Stats
                subscribers_count='200'
                stargazers_count='300'
                forks_count='150'
            />
        )
        expect(screen.queryByTestId('subscribers_count').textContent).toBe('200');
        expect(screen.queryByTestId('stargazers_count').textContent).toBe('300');
        expect(screen.queryByTestId('forks_count').textContent).toBe('150');
    });
});