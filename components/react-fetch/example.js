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
    executeGet("https://api.github.com/repos/tannerlinsley/react-query", successHandler, errorHandler);
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