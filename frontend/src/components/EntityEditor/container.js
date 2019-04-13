import React, { Component } from "react";
import PropTypes from "prop-types";
import EntityEditor from "./presenter";

class Container extends Component {
  state = {
    loading: true,
    name: "",
    dropdownOpen: false,
    valueInput: "",
    synonym: "",
    synonyms: []
  };

  static propTypes = {
    closeEdit: PropTypes.func.isRequired,
    createEntity: PropTypes.func.isRequired,
    createEntityValue: PropTypes.func.isRequired
  };

  componentDidMount = () => {
    console.log("edit dialog open!!!!");
  };

  componentWillReceiveProps = nextProps => {
    console.log(nextProps);
    if (nextProps.entity) {
      this.setState({
        loading: false,
        name: nextProps.entity.name
      });
    }
  };

  render() {
    console.log(this.state);
    const {
      loading,
      name,
      valueInput,
      dropdownOpen,
      synonym,
      synonyms
    } = this.state;
    return (
      <EntityEditor
        loading={loading}
        name={name}
        valueInput={valueInput}
        synonym={synonym}
        synonyms={synonyms}
        dropdownOpen={dropdownOpen}
        toggle={this._toggle}
        handleInputChange={this._handleInputChange}
        handleSubmit={this._handleSubmit}
        handleValueSubmit={this._handleValueSubmit}
        handleAddSynonymClick={this._handleAddSynonymClick}
        handleDeleteSynonymClick={this._handleDeleteSynonymClick}
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

  _handleValueSubmit = event => {
    event.preventDefault();
    const { valueInput, synonyms } = this.state;
    console.log(this.props);
    const {
      entity: { id },
      createEntityValue
    } = this.props;

    const modifiedSynomys = synonyms.map(synonym => {
      return { text: synonym };
    });

    console.log(modifiedSynomys);

    const value_test = {
      entity_value_name: valueInput,
      entity_type: "synonyms",
      entity_synonym: modifiedSynomys
    };

    createEntityValue(id, value_test);
    console.log("Add Value!!", value_test);

    this.setState({
      valueInput: "",
      synonym: "",
      synonyms: []
    });
  };

  _toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  // _handleInputChange = event => {
  //   event.preventDefault();
  //   const {
  //     target: { value, name }
  //   } = event;

  //   this.setState({ [name]: value });
  // };

  _handleAddSynonymClick = e => {
    e.preventDefault();
    console.log("_handleAddSynonymClick");

    const { synonyms, synonym } = this.state;
    this.setState({
      synonyms: [...synonyms, synonym],
      synonym: ""
    });
  };

  _handleDeleteSynonymClick = e => {
    e.preventDefault();
    console.log("_handleDeleteSynonymClick", e.currentTarget.value);

    const { synonyms } = this.state;

    const updateSynonyms = synonyms.filter(
      item => item !== e.currentTarget.value
    );

    // const
    this.setState({
      synonyms: updateSynonyms
    });
  };
}

export default Container;
