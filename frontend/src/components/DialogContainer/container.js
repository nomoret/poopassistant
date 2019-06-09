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
      />
    );
  }

  _openNodeEdit = (...thisArgs) => {
    console.log("open node", thisArgs);
    this.setState({
      seeingLikes: true
    });

    const node = thisArgs[0];
    const { selectEditNode } = this.props;
    selectEditNode(node.id);
  };

  _closeNodeEdit = e => {
    e.preventDefault();
    console.log("close node");
    this.setState({
      seeingLikes: false
    });
  };
}

export default Container;
