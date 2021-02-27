import React from "react";
import Example from '../../components/react-fetch/example.js'
import { executeGet } from "../../components/common/api";

export class ReactQueryExamplePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoading: true,
            data: null
        };
    }

    fetchData() {
        var successHandler = (result) => {
            this.setState({
                isLoading: false,
                data: result.data
            });
        }
        var errorHandler = (httpError) => {
            this.setState({
                isLoading: false,
                error: httpError
            });
        }
        const url = process.env.NEXT_PUBLIC_API_BASE_URL + "/repos/tannerlinsley/react-query";
        const queryParams = {}
        executeGet(url, queryParams, successHandler, errorHandler);
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        if (this.state.isLoading) {
            return (
                "Loading..."
            );
        }

        if (this.state.error) {
            return (
                "An error has occurred: " + JSON.stringify(this.state.error)
            );
        };

        return (
            <div>
                <Example />
                <div>Data: {this.state.data.name}</div>
            </div>
        );
    }
}

export default ReactQueryExamplePage;