import React, { Component } from "react";
import styles from "./styles.module.scss";
import DialogTree from "components/DialogTree";
import NodeEditor from "components/NodeEditor";

class DialogContainer extends Component {
  state = {
    seeingLikes: false
  };

  render() {
    return (
      <div className={styles.dialogContainer}>
        <header className={styles.dialogHeader}>
          <div>Add node</div>
          <div>Add child node</div>
          <div>Add folder</div>
          <div>
            <span>Settings</span>
          </div>
        </header>
        <div className={styles.dialog}>
          <DialogTree openEdit={this._openNodeEdit} />
          {this.state.seeingLikes && (
            <NodeEditor closeEdit={this._closeNodeEdit} />
          )}
        </div>
      </div>
    );
  }

  _openNodeEdit = () => {
    console.log("open node");
    this.setState({
      seeingLikes: true
    });
  };

  _closeNodeEdit = e => {
    e.preventDefault();
    console.log("close node");
    this.setState({
      seeingLikes: false
    });
  };
}

export default DialogContainer;
