import React from "react";
import { executeGet } from "../common/api";

export class Example extends React.Component {
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
        <div data-testid="initial-content">"Loading..."</div>
      );
    }

    if (this.state.error) {
      return (
        <div data-testid="error-content">"An error has occurred: " + {JSON.stringify(this.state.error.response)}</div>
      );
    };

    return (
      <div data-testid="success-content">
        <h1 data-testid="name">{this.state.data.name}</h1>
        <p data-testid="description">{this.state.data.description}</p>
        <strong>👀 <span data-testid="subscribers_count">{this.state.data.subscribers_count}</span></strong>{" "}
        <strong>✨ <span data-testid="stargazers_count">{this.state.data.stargazers_count}</span></strong>{" "}
        <strong>🍴 <span data-testid="forks_count">{this.state.data.forks_count}</span></strong>
      </div>
    );
  }
}

export default Example;