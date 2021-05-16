const axios = require('axios');

export function executeGet(url, queryParams, successHandler, errorHandler, timeoutMillis = 1000) {
    axios.get(url, {params: queryParams, timeout: timeoutMillis})
      .then(successHandler)
      .catch(errorHandler);
};

export function executePost(url, data, successHandler, errorHandler, timeoutMillis = 1000) {
    axios.post(url, data, {timeout: timeoutMillis})
      .then(successHandler)
      .catch(errorHandler);
};

export function executeDelete(url, data, successHandler, errorHandler, timeoutMillis = 1000) {
    axios.delete(url, {data: data, timeout: timeoutMillis})
      .then(successHandler)
      .catch(errorHandler);
};