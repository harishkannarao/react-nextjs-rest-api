import React from "react";
import Example from '../../components/react-fetch/example.js'
import { getRepoData } from "../../components/common/github";

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
        getRepoData("tannerlinsley", "react-query", successHandler, errorHandler);
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