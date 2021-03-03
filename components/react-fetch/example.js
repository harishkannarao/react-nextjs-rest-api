import React from "react";
import { getRepoData } from "../common/github";
import { Stats } from "./stats";


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
    const successHandler = (result) => {
      this.setState({
        isLoading: false,
        data: result.data
      });
    }
    const errorHandler = (httpError) => {
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
        <Stats 
          subscribers_count={this.state.data.subscribers_count}
          stargazers_count={this.state.data.stargazers_count}
          forks_count={this.state.data.forks_count}
        />
      </div>
    );
  }
}

export default Example;