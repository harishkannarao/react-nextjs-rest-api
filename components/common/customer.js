import { executeGet, executePost, executeDelete } from "./api";

export function listCustomers(successHandler, errorHandler) {
    executeGet(
        process.env.NEXT_PUBLIC_CUSTOMER_API_BASE_URL + "/customers", 
        {}, 
        successHandler, 
        errorHandler
    );
}

export function createCustomer(data, successHandler, errorHandler) {
    executePost(
        process.env.NEXT_PUBLIC_CUSTOMER_API_BASE_URL + "/customers", 
        data, 
        successHandler, 
        errorHandler
    );
}

export function deleteCustomer(data, successHandler, errorHandler) {
    executeDelete(
        process.env.NEXT_PUBLIC_CUSTOMER_API_BASE_URL + "/customers", 
        data, 
        successHandler, 
        errorHandler
    );
}