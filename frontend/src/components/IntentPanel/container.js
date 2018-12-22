import React, { Component } from "react";
import IntentPanel from "./presenter";
import PropTypes from "prop-types";

class Container extends Component {
  state = {
    loading: true,
    seeingLikes: false
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
    return (
      <IntentPanel
        {...this.state}
        intents={intentList}
        openEdit={this._openEdit}
        closeEdit={this._closeEdit}
      />
    );
  }

  _addIntent = () => {};

  _openEdit = ({ intent, ...props }) => {
    console.log("openEdit");
    console.log(intent);

    if (intent) {
      this.setState({
        seeingLikes: true,
        editIntent: intent
      });
    } else {
      this.setState({
        seeingLikes: true,
        editIntent: null
      });
    }
  };

  _closeEdit = () => {
    console.log("closeEdit");
    this.setState({
      seeingLikes: false
    });
  };
}
export default Container;
