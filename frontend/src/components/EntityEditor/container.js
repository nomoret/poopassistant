import React, { Component } from "react";
import PropTypes from "prop-types";
import EntityEditor from "./presenter";

class Container extends Component {
  state = {
    loading: true,
    // name: "",
    dropdownOpen: false
  };

  static propTypes = {
    closeEdit: PropTypes.func.isRequired,
    createEntity: PropTypes.func.isRequired
  };

  componentDidMount = () => {
    console.log("edit dialog open!!!!");
  };

  componentWillReceiveProps = nextProps => {
    console.log(nextProps);
    if (nextProps.entity) {
      this.setState({
        loading: false
      });
    }
  };

  render() {
    console.log(this.state);
    const { loading, name, dropdownOpen } = this.state;
    return (
      <EntityEditor
        loading={loading}
        name={name}
        dropdownOpen={dropdownOpen}
        toggle={this._toggle}
        handleInputChange={this._handleInputChange}
        handleSubmit={this._handleSubmit}
        handleExampleSubmit={this._handleExampleSubmit}
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
    const { createEntity } = this.props;
    const { name } = this.state;
    createEntity(name);
  };

  _handleExampleSubmit = event => {
    event.preventDefault();
    const { example } = this.state;

    console.log(example);
  };

  _toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };
}

export default Container;
