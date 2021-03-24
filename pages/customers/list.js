import React from 'react';
import Head from 'next/head'
import Link from 'next/link'
import { withRouter } from 'next/router'
import { listCustomers, deleteCustomer } from "../../components/common/customer";
import { CustomerList } from "../../components/customer/customer";

export class CustomersListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputFirstName: '',
            firstNameTypingTimeout: null,
            error: null,
            isProcessing: false,
            data: []
        };
        this.handleDeleteCustomer = this.handleDeleteCustomer.bind(this);
        this.errorHandler = this.errorHandler.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    }

    handleFirstNameChange(event) {
        event.preventDefault();
        if (this.state.firstNameTypingTimeout) {
            clearTimeout(this.state.firstNameTypingTimeout);
        }
        this.setState({
            'inputFirstName': event.target.value,
            firstNameTypingTimeout: setTimeout(() => {
                this.performFirstNameChange(event);
            }, 500)
        });
    }

    performFirstNameChange(event) {
        const query = this.props.router.query;
        if (event.target.value.trim() != '') {
            query['firstName'] = event.target.value;
        } else {
            delete query['firstName'];
        }
        const url = {
            'pathname': this.props.router.pathname,
            'query': query
        }
        this.props.router.push(url, undefined, { shallow: true });
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
        const data = { 'id': Number(event.target.getAttribute('data-id')) }
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
                <label>
                    First Name:
                        <input data-testid="input-first-name" name="inputFirstName" type="text"
                        value={this.state.inputFirstName}
                        onChange={this.handleFirstNameChange} />
                </label>
                <CustomerList router={this.props.router} isProcessing={this.state.isProcessing} handleDeleteCustomer={this.handleDeleteCustomer} data={this.state.data} />
            </div>
        );
    }
}

export default withRouter(CustomersListPage)