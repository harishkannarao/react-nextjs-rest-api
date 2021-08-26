import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { listCustomers, deleteCustomer } from "../../components/common/customer";
import * as queryParamModule from "../../components/common/query_param"
import { CustomerList } from "../../components/customer/customer";
import { DisplayError } from "../../components/error/error";


export function CustomersListPage() {
    const router = useRouter();
    const defaultTitle = 'List - Customers';
    const [title, setTitle] = useState(defaultTitle);
    const [inputFirstName, setInputFirstName] = useState('');
    const [firstNameTypingTimeout, setFirstNameTypingTimeout] = useState(undefined);
    const [error, setError] = useState(undefined);
    const [isProcessing, setIsProcessing] = useState(false);
    const [data, setData] = useState([]);

    function errorHandler(httpError) {
        setIsProcessing(false);
        setError(httpError);
    }

    function fetchData(firstName) {
        setIsProcessing(true);
        const successHandler = (result) => {
            setIsProcessing(false);
            setData(result.data);
            setError(undefined);
        }
        listCustomers(firstName, successHandler, errorHandler);
    }

    function handleFirstNameChange(event) {
        event.preventDefault();
        if (firstNameTypingTimeout) {
            clearTimeout(firstNameTypingTimeout);
            setFirstNameTypingTimeout(undefined);
        }
        setInputFirstName(event.target.value);
        setFirstNameTypingTimeout(setTimeout(() => {
            fetchData(event.target.value.trim());
        }, 500));
        let query = router.query;
        if (event.target.value.trim() == '') {
            delete query['firstName'];
        } else {
            query['firstName'] = event.target.value;
        }
        const url = {
            'pathname': router.pathname,
            'query': query
        }
        router.push(url, undefined, { shallow: true });
    }

    function handleDeleteCustomer(event) {
        event.preventDefault();
        setIsProcessing(true);
        const successHandler = (_result) => {
            fetchData(inputFirstName.trim());
        }
        const data = { 'id': Number(event.currentTarget.getAttribute('data-id')) }
        deleteCustomer(data, successHandler, errorHandler)
    }

    function updateTitle() {
        if (inputFirstName.trim() != '') {
            setTitle(inputFirstName + " :: " + 'List - Customers');
        } else {
            setTitle(defaultTitle);
        }
    }

    useEffect(() => {
        let firstName = queryParamModule.getParameterByName("firstName");
        if (firstName != null) {
            setInputFirstName(firstName);
        }
        fetchData(firstName);
        return () => {
            if (firstNameTypingTimeout) {
                clearTimeout(firstNameTypingTimeout);
            }
        };
    }, []);

    useEffect(() => updateTitle(), [inputFirstName]);

    return (
        <div>
            <Head>
                <title>{title}</title>
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
                !isProcessing && error &&
                <DisplayError error={error} />
            }
            <label>
                First Name:
                        <input data-testid="input-first-name" name="inputFirstName" type="text"
                    value={inputFirstName}
                    onChange={handleFirstNameChange} />
            </label>
            <CustomerList router={router} isProcessing={isProcessing} handleDeleteCustomer={handleDeleteCustomer} data={data} />
        </div>
    )
}

export default CustomersListPage;