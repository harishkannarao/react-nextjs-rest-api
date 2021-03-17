import React from 'react';
import Head from 'next/head'
import Link from 'next/link'
import { listCustomers, deleteCustomer } from "../../components/common/customer";
import { CustomerList } from "../../components/customer/customer";

export class CustomersListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isProcessing: false,
            data: []
        };
        this.handleDeleteCustomer = this.handleDeleteCustomer.bind(this);
        this.errorHandler = this.errorHandler.bind(this);
    }

    errorHandler(httpError) {
        this.setState({
            isProcessing: false,
            error: httpError
        });
    }

    handleDeleteCustomer(event) {
        event.preventDefault();
        this.setState({
            isProcessing: true
        });
        const successHandler = (result) => {
            this.fetchData();
        }
        const data = {'id': Number(event.target.dataset.id)}
        deleteCustomer(data, successHandler, this.errorHandler)
    }

    fetchData() {
        this.setState({
            isProcessing: true
        });
        const successHandler = (result) => {
            this.setState({
                isProcessing: false,
                data: result.data,
                error: null,
            });
        }
        listCustomers(successHandler, this.errorHandler);
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
                <h3>
                    <Link href="/">
                        <a data-testid="home-link">Home</a>
                    </Link>
                </h3>
                <h3>
                    <Link href="/customers/new/">
                        <a data-testid="new-customer-link">New - Customer</a>
                    </Link>
                </h3>
                {
                    !this.state.isProcessing && this.state.error &&
                        <div data-testid="error-content">"An error has occurred: " + {JSON.stringify(this.state.error.response)}</div>
                }
                <CustomerList isProcessing={this.state.isProcessing} handleDeleteCustomer={this.handleDeleteCustomer} data={this.state.data} />
            </div>
        );
    }
}

export default CustomersListPage 