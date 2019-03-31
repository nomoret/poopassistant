import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";
import ChatPanel from "./presenter";

class Container extends Component {
  state = {};

  static propTypes = {
    sendMessage: PropTypes.func.isRequired
  };

  render() {
    return <ChatPanel {...this.props} />;
  }

  _sendMessage = msg => {
    const { sendMessage } = this.props;
    sendMessage(msg);
  };
}

export default Container;
