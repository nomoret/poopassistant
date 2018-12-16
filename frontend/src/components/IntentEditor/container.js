import React, { Component } from "react";
import PropTypes from "prop-types";
import IntentEditor from "./presenter";

class Container extends Component {
  state = {
    loading: true,
    name: "",
    description: ""
  };

  static propTypes = {
    closeEdit: PropTypes.func.isRequired,
    createIntent: PropTypes.func.isRequired
  };

  render() {
    const { name, description } = this.state;
    console.log(this.state);
    return (
      <IntentEditor
        name={name}
        description={description}
        handleInputChange={this._handleInputChange}
        handleSubmit={this._handleSubmit}
        {...this.props}
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

    const { name, description } = this.state;
    const { createIntent } = this.props;
    console.log(name);
    createIntent(name, description);
  };
}

export default Container;
