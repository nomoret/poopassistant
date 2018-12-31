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
    getIntent: PropTypes.func.isRequired,
    clearIntent: PropTypes.func.isRequired,
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
        addIntent={this._addIntent}
        openEdit={this._openEdit}
        closeEdit={this._closeEdit}
      />
    );
  }

  _addIntent = () => {
    console.log("addIntent");
    this.setState({
      seeingLikes: true
    });
    //clear editInent
  };

  _openEdit = props => {
    console.log("openEdit");
    this.setState({
      seeingLikes: true
    });

    const {
      intent: { id }
    } = props;
    //get editIntent
    const { getIntent } = this.props;
    getIntent(id);
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
