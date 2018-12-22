import React, { Component } from "react";
import PropTypes from "prop-types";
import IntentEditor from "./presenter";

class Container extends Component {
  state = {
    loading: true,
    edit: false,
    name: "",
    description: ""
  };

  static propTypes = {
    closeEdit: PropTypes.func.isRequired,
    createIntent: PropTypes.func.isRequired,
    getExamples: PropTypes.func.isRequired,
    createExample: PropTypes.func.isRequired
  };

  componentDidMount = () => {
    console.log(this.props);
    const { editIntent } = this.props;
    if (editIntent) {
      const { id, name, description } = editIntent;

      this.setState({
        id,
        edit: true,
        name,
        description
      });

      const { getExamples } = this.props;
      getExamples(id);
    }
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.examples) {
      this.setState({
        loading: false
      });
    }
  };

  render() {
    console.log(this.state);
    return (
      <IntentEditor
        {...this.state}
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

    const { name, description, example } = this.state;

    if (example) {
      console.log("add example");
      console.log(this.props);
      const { createExample } = this.props;
      createExample(example);
      this.setState({
        example: ""
      });
    } else {
      const { createIntent } = this.props;
      console.log(name);
      createIntent(name, description);
    }
  };

  _handleExampleSubmit = event => {
    event.preventDefault();
    const { example } = this.state;

    console.log(example);
  };
}

export default Container;
