import axios, { AxiosResponse } from 'axios';

export function executeGet(url, queryParams, timeoutMillis = 1000) {
    return axios.get(url, {params: queryParams, timeout: timeoutMillis});
};

export function executePost(url, data, timeoutMillis = 1000) {
  return axios.post(url, data, {timeout: timeoutMillis});
};

export function executeDelete(url, data, timeoutMillis = 1000) {
  return axios.delete(url, {data: data, timeout: timeoutMillis});
};