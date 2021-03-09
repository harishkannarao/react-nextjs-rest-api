import React from 'react';
import Head from 'next/head'
import Link from 'next/link'
import { listCustomers } from "../../components/common/customer";
import { CustomerList } from "../../components/customer/customer";

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
                    <a data-testid="home-link">Home</a>
                </Link>
                <br />
                <Link href="/customers/new/">
                    <a data-testid="new-customer-link">New - Customer</a>
                </Link>
                {
                    this.state.isLoading
                        ? (
                            <div data-testid="initial-content">"Loading..."</div>
                        ) : (
                            this.state.error
                                ? <div data-testid="error-content">"An error has occurred: " + {JSON.stringify(this.state.error.response)}</div>
                                : <CustomerList data={this.state.data} />
                        )
                }
            </div>
        );
    }
}

export default CustomersListPage 