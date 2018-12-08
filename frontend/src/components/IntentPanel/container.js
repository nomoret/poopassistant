import React, { Component } from "react";
import IntentPanel from "./presenter";
import PropTypes from "prop-types";

class Container extends Component {
  state = {
    loading: true
  };

  static propTypes = {
    getIntentList: PropTypes.func.isRequired,
    intentList: PropTypes.array
  };

  componentDidMount() {
    console.log("componentDidMount");
    const { getIntentList } = this.props;
    if (!this.props.intentList) {
      getIntentList();
    } else {
      this.setState({ loading: false });
    }
  }

  componentWillReceiveProps = nextProps => {
    console.log("componentWillReceiveProps");
    if (nextProps.intentList) {
      this.setState({
        loading: false
      });
    }
  };

  render() {
    const { intentList } = this.props;
    return <IntentPanel {...this.state} intents={intentList} />;
  }
}
export default Container;
