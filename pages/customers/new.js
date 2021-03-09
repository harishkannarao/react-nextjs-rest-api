import React from 'react';
import Head from 'next/head'
import Link from 'next/link'
import { withRouter } from 'next/router'
import { createCustomer } from '../../components/common/customer'

export class NewCustomerPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            inputFirstName: '',
            inputLastName: '',
            submittingData: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleInputChange(event) {
        event.preventDefault();
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({
            submittingData: true,
            error: null
        })
        const successHandler = (result) => {
            this.setState({
                inputFirstName: '',
                inputLastName: '',
                submittingData: false,
                error: null
            });
            this.props.router.push('/customers/list/');
        }
        const errorHandler = (httpError) => {
            this.setState({
                submittingData: false,
                error: httpError
            });
        }
        const data = {
            firstName: this.state.inputFirstName,
            lastName: this.state.inputLastName
        }
        createCustomer(data, successHandler, errorHandler);
    }

    handleCancel(event) {
        event.preventDefault();
        this.props.router.push('/customers/list/');
    }

    render() {
        return (
            <div>
                <Head>
                    <title>New - Customers</title>
                </Head>
                <Link href="/">
                    <a>Home</a>
                </Link>
                <br />
                <Link href="/customers/list/">
                    <a>List - Customers</a>
                </Link>
                {
                    this.state.submittingData ? (
                        <div data-testid="initial-content">"Submitting..."</div>
                    ) : (
                        this.state.error && (
                            <div data-testid="error-content">"An error has occurred: " + {JSON.stringify(this.state.error.response)}</div>
                        )
                    )
                }
                <form onSubmit={this.handleSubmit}>
                    <label>
                        First Name:
          <input name="inputFirstName" type="text"
                            value={this.state.inputFirstName}
                            onChange={this.handleInputChange} />
                    </label>
                    <br />
                    <label>
                        Last Name:
          <input name="inputLastName" type="text"
                            value={this.state.inputLastName}
                            onChange={this.handleInputChange} />
                    </label>
                    <br />
                    <input type="submit" value="Submit" />
                    <input type="button" onClick={this.handleCancel} value="Cancel" />
                </form>
            </div>
        );
    }
}

export default withRouter(NewCustomerPage)