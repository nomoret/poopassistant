import React, { Component } from "react";
import PropTypes from "prop-types";
import EntityValueTable from "./presenter";

class Container extends Component {
  state = {};

  static propTypes = {
    // closeEdit: PropTypes.func.isRequired,
    // createIntent: PropTypes.func.isRequired,
    // getExamples: PropTypes.func.isRequired,
    // createExample: PropTypes.func.isRequired
  };

  render() {
    console.log(this.state);
    return <EntityValueTable {...this.props} />;
  }
}

export default Container;
