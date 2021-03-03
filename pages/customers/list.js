import React from 'react';
import Head from 'next/head'
import Link from 'next/link'
import { listCustomers } from "../../components/common/customer";

export class CustomersListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoading: true,
            data: null
        };
    }

    fetchData() {
        const successHandler = (result) => {
            this.setState({
                isLoading: false,
                data: result.data
            });
        }
        const errorHandler = (httpError) => {
            this.setState({
                isLoading: false,
                error: httpError
            });
        }
        listCustomers(successHandler, errorHandler);
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        return (
            <div>
                <Head>
                    <title>List - Customers</title>
                </Head>
                <Link href="/">
                    <a>Home</a>
                </Link>
                { this.state.isLoading &&
                    <div data-testid="initial-content">"Loading..."</div>
                }
                { this.state.error
                    ? <div data-testid="error-content">"An error has occurred: " + {JSON.stringify(this.state.error.response)}</div>
                    : <div data-testid="success-content">"Success: " + {JSON.stringify(this.state.data)}</div>
                }
            </div>
        );
    }
}

export default CustomersListPage 