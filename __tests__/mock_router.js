export function createMockRouter() {
    return {
        pathname: '',
        query: {},
        push: function(url, as, options) {
            return;
        }
    }
}