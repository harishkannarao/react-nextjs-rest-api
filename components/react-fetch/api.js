const axios = require('axios');

export function executeGet(url, queryParams, successHandler, errorHandler) {
    axios.get(url, {params: queryParams})
      .then(successHandler)
      .catch(errorHandler);
};