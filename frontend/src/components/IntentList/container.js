import React, { Component } from "react";
import PropTypes from "prop-types";
import IntentList from "./presenter";

class Container extends Component {
  state = {};

  static propTypes = {
    openEdit: PropTypes.func.isRequired
  };

  render() {
    return <IntentList {...this.props} />;
  }
}
export default Container;
