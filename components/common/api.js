const axios = require('axios');

export function executeGet(url, queryParams, successHandler, errorHandler) {
    axios.get(url, {params: queryParams, timeout: 1000})
      .then(successHandler)
      .catch(errorHandler);
};