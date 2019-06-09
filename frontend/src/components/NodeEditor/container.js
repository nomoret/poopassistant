import React, { Component } from "react";
import NodeEditor from "./presenter";
import PropTypes from "prop-types";

class Container extends Component {
  state = {
    loading: true,
    title: "",
    desc: "",
    response: ""
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
        responses
      });
    }
  };

  render() {
    const { title, desc, response, responses } = this.state;
    const { closeEdit } = this.props;
    return (
      <NodeEditor
        title={title}
        desc={desc}
        // response={response}
        responses={responses}
        closeEdit={closeEdit}
        handleInputChange={this._handleInputChange}
        handleEnterKeyDown={this._handleEnterKeyDown}
      />
    );
  }

  _handleInputChange = e => {
    console.log(e.target);
    const {
      target: { value, name }
    } = e;

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

      console.log("modified node", node);
      updateEditNode(id, node);

      this.setState({
        response: ""
      });
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
