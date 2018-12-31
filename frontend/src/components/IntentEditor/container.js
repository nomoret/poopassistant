import React, { Component } from "react";
import PropTypes from "prop-types";
import IntentEditor from "./presenter";

class Container extends Component {
  state = {
    loading: true,
    edit: false,
    name: "",
    description: "",
    example: ""
  };

  static propTypes = {
    closeEdit: PropTypes.func.isRequired,
    createIntent: PropTypes.func.isRequired,
    getExamples: PropTypes.func.isRequired,
    createExample: PropTypes.func.isRequired
  };

  componentDidMount = () => {
    console.log("edit dialog open!!!!");
  };

  componentWillReceiveProps = nextProps => {
    console.log(this.props);
    console.log(nextProps);

    if (nextProps.examples) {
      this.setState({
        loading: false
      });
    }
  };

  render() {
    console.log(this.state);
    const { id, loading, edit, name, description, example } = this.state;
    return (
      <IntentEditor
        id={id}
        loading={loading}
        edit={edit}
        name={name}
        description={description}
        example={example}
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
      const { id, createExample } = this.props;
      createExample(id, example);
      this.setState({
        example: ""
      });
    } else {
      const { createIntent } = this.props;
      this.setState({
        loading: false,
        examples: []
      });

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
