import React from 'react';
import Head from 'next/head'

export class HomePage extends React.Component {
    render() {
        return (
            <div>
                <Head>
                    <title>Next.js!!!</title>
                </Head>
                <div data-testid="message">Welcome to Next.js!!!</div>
            </div>
        );
    }
}

export default HomePage  