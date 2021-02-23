import React from "react";

export class Example extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoading: true,
            data: null
        };
    }

    componentDidMount() {
        fetch("https://api.github.com/repos/tannerlinsley/react-query")
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoading: false,
                data: result
              });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              this.setState({
                isLoading: false,
                error
              });
            }
          )
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