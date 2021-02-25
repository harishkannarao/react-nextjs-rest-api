import React from "react";
import { executeGet } from "./api";

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
        data: result
      });
    }
    var errorHandler = (error) => {
      this.setState({
        isLoading: false,
        error
      });
    }
    var url = process.env.NEXT_PUBLIC_API_BASE_URL + "/repos/tannerlinsley/react-query";
    executeGet(url, successHandler, errorHandler);
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    if (this.state.isLoading) return "Loading...";

    if (this.state.error) return "An error has occurred: " + this.state.error.message;

    return (
      <div>
        <h1>{this.state.data.name}</h1>
        <p>{this.state.data.description}</p>
        <strong>👀 {this.state.data.subscribers_count}</strong>{" "}
        <strong>✨ {this.state.data.stargazers_count}</strong>{" "}
        <strong>🍴 {this.state.data.forks_count}</strong>
      </div>
    );
  }
}

export default Example;