import React from 'react';
import Head from 'next/head'
import Link from 'next/link'

export class HomePage extends React.Component {
    render() {
        return (
            <div>
                <Head>
                    <title>Next.js!!!</title>
                </Head>
                <div data-testid="message">Welcome to Next.js!!!</div>
                <Link href="/customers/list/">
                    <a>Customers List</a>
                </Link>
            </div>
        );
    }
}

export default HomePage  