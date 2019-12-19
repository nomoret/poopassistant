import React, { Component } from "react";
import PropTypes from "prop-types";
import DialogContainer from "./presenter";

class Container extends Component {
  state = {
    loading: false,
    seeingLikes: false
  };

  componentDidMount() {
    console.log("viewing");
    const { getNodeTree } = this.props;
    if (getNodeTree) {
      getNodeTree();
    }
  }

  static propTypes = {
    getNodeTree: PropTypes.func.isRequired,
    addChildNode: PropTypes.func.isRequired,
    removeNode: PropTypes.func.isRequired,
    selectEditNode: PropTypes.func.isRequired
  };

  render() {
    const { seeingLikes } = this.state;
    const { tree } = this.props;
    return (
      <DialogContainer
        seeingLikes={seeingLikes}
        tree={tree}
        openNodeEdit={this._openNodeEdit}
        closeNodeEdit={this._closeNodeEdit}
        createChildNode={this._createChildNode}
        removeNode={this._removeNode}
      />
    );
  }

  _openNodeEdit = (...thisArgs) => {
    console.log("open node", thisArgs);

    const node = thisArgs[0];
    const { selectEditNode } = this.props;
    selectEditNode(node.id);

    this.setState({
      seeingLikes: true
    });
  };

  _closeNodeEdit = e => {
    e.preventDefault();
    console.log("close node");
    this.setState({
      seeingLikes: false
    });
  };

  _createChildNode = index => e => {
    // console.log(e, index);
    // e.preventDefault();

    const { addChildNode } = this.props;
    addChildNode(index);
  };

  _removeNode = (e, index) => {
    e.preventDefault();
    const { removeNode } = this.props;
    removeNode(index);
  };
}

export default Container;
