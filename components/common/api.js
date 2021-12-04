import axios from 'axios';

const instance = axios.create({
  headers: {'X-Custom-Header': 'foo-bar'}
});

export function executeGet(url, queryParams, timeoutMillis = 1000) {
    return instance.get(url, {params: queryParams, timeout: timeoutMillis});
};

export function executePost(url, data, timeoutMillis = 1000) {
  return instance.post(url, data, {timeout: timeoutMillis});
};

export function executeDelete(url, data, timeoutMillis = 1000) {
  return instance.delete(url, {data: data, timeout: timeoutMillis});
};