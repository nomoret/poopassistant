import React, { Component } from "react";
import PropTypes from "prop-types";
import Auth from "./presenter";

class Container extends Component {
  state = {
    username: "",
    password: ""
  };

  static propTypes = {
    userLogin: PropTypes.func.isRequired
  };

  render() {
    const { username, password } = this.state;
    return (
      <Auth
        username={username}
        password={password}
        handleInputChange={this._handleInputChange}
        handleSubmit={this._handleSubmit}
      />
    );
  }

  _handleInputChange = event => {
    const {
      target: { value, name }
    } = event;

    this.setState({ [name]: value });
    console.log(this.state);
  };

  _handleSubmit = event => {
    console.log("submit");
    event.preventDefault();

    const { username, password } = this.state;
    const { userLogin } = this.props;

    userLogin(username, password);
  };
}
export default Container;
