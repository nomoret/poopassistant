import React from "react";
import styles from "./styles.module.scss";
import DialogTree from "components/DialogTree";
import NodeEditor from "components/NodeEditor";
import Ionicon from "react-ionicons";

const DialogContainer = props => {
  return (
    <div className={styles.dialogContainer}>
      <header className={styles.dialogHeader}>
        <div className={styles.addNode}>Add node</div>
        <div className={styles.addNode}>Add child node</div>
        <div className={styles.addNode}>Add folder</div>
        <div className={styles.setting}>
          <Ionicon
            icon="ios-settings-outline"
            fontSize="24px"
            color="#047cc0"
          />
          <span>Settings</span>
        </div>
      </header>
      <div className={styles.dialog}>
        <DialogTree
          tree={props.tree}
          openEdit={props.openNodeEdit}
          removeNode={props.removeNode}
        />
        {props.seeingLikes && <NodeEditor closeEdit={props.closeNodeEdit} />}
      </div>
    </div>
  );
};

export default DialogContainer;
