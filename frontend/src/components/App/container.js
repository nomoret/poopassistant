import React, { Component } from "react";
import App from "./presenter";

class Container extends Component {
  state = {
    toggleChatPanel: false
  };

  render() {
    const { toggleChatPanel } = this.state;
    return (
      <App
        {...this.props}
        toggleChatPanel={toggleChatPanel}
        openChatPanel={this._openChatPanel}
        closeChatPanel={this._closeChatPanel}
      />
    );
  }

  _openChatPanel = () => {
    console.log("open chat panel");
    this.setState({
      toggleChatPanel: true
    });
  };

  _closeChatPanel = () => {
    console.log("open chat panel");
    this.setState({
      toggleChatPanel: false
    });
  };
}

export default Container;
