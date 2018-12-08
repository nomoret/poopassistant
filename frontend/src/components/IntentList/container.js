import React, { Component } from "react";
import IntentList from "./presenter";

class Container extends Component {
  render() {
    return <IntentList {...this.props} />;
  }
}
export default Container;
