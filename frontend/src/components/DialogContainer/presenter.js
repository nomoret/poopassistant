import React from "react";
import styles from "./styles.module.scss";
import DialogTree from "components/DialogTree";
import NodeEditor from "components/NodeEditor";

const DialogContainer = props => {
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
        <DialogTree tree={props.tree} openEdit={props.openNodeEdit} />
        {props.seeingLikes && <NodeEditor closeEdit={props.closeNodeEdit} />}
      </div>
    </div>
  );
};

export default DialogContainer;
