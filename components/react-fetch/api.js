export function executeGet(url, successHandler, errorHandler) {
    fetch(url)
        .then(res => res.json())
        .then(successHandler, errorHandler)
};