import React, { Component } from "react";
import NodeEditor from "./presenter";
import PropTypes from "prop-types";

class Container extends Component {
  state = {
    loading: true,
    title: "",
    desc: "",
    condition: "",
    response: "",
    autocompleteList: null
  };

  static propTypes = {
    updateEditNode: PropTypes.func.isRequired,
    closeEdit: PropTypes.func.isRequired
  };

  componentDidMount() {
    console.log("componentDidMount");
    // const { getIntentList } = this.props;
    // if (!this.props.intentList) {
    //   getIntentList();
    // } else {
    //   this.setState({ loading: false });
    // }
  }

  componentWillReceiveProps = nextProps => {
    console.log("componentWillReceiveProps", nextProps);
    if (nextProps.editNode) {
      const { id, title, desc, message, responses } = nextProps.editNode;

      this.setState({
        loading: false,
        id,
        title,
        desc,
        message,
        responses
      });
    }
  };

  render() {
    const {
      title,
      desc,
      condition,
      message,
      response,
      responses,
      autocompleteList
    } = this.state;
    const { closeEdit } = this.props;
    return (
      <NodeEditor
        title={title}
        desc={desc}
        condition={condition}
        message={message}
        response={response}
        responses={responses}
        closeEdit={closeEdit}
        autocompleteList={autocompleteList}
        handleInputChange={this._handleInputChange}
        handleEnterKeyDown={this._handleEnterKeyDown}
      />
    );
  }

  _handleInputChange = e => {
    const {
      target: { value, name }
    } = e;

    if (name === "condition") {
      //얻어오기
      const { intentList } = this.props;

      if (intentList && value.length > 0) {
        let result = [];
        intentList.forEach((v, i) => {
          if (
            v.name.substr(0, value.length).toUpperCase() == value.toUpperCase()
          ) {
            result.push(v);
          }
        });
        this.setState({
          autocompleteList: result
        });
      } else {
        this.setState({
          autocompleteList: null
        });
      }
    }

    this.setState({
      [name]: value
    });
  };

  _handleEnterKeyDown = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      console.log(e.target, this.state);
      const { updateEditNode } = this.props;
      const { id, title, desc, message, response, responses } = this.state;
      const node = {
        title,
        desc,
        message,
        response,
        responses
      };

      this.setState({
        response: ""
      });

      console.log("modified node", node);
      updateEditNode(id, node);
    }
  };

  _closeEdit = () => {
    console.log("closeEdit");
    this.setState({
      seeingLikes: false
    });

    //diff editIntent
    const { clearIntent } = this.props;
    clearIntent();
  };
}
export default Container;
