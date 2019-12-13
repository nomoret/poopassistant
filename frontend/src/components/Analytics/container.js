import React, { Component } from "react";
import Analytics from "./presenter";

class Container extends Component {
  state = {
    loading: true
  };

  static propTypes = {};

  render() {
    return <Analytics />;
  }
}
export default Container;
