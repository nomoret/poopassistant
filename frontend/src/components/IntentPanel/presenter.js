import React from "react";
import styles from "./styles.module.scss";
import IntentList from "components/IntentList";
import Ionicon from "react-ionicons";

const IntentPanel = props => {
  console.log("UserList no stateless");
  console.log(props);
  return (
    <div className={styles.container}>
      <div className={styles.action}>
        <button className={styles.addIntent} title="add Intent">
          add Intent
        </button>
        <button className={styles.import} title="Import intents">
          <Ionicon
            icon="ios-cloud-upload-outline"
            fontSize="24px"
            color="#047cc0"
          />
        </button>
        <button className={styles.export} title="Export">
          <Ionicon
            icon="ios-download-outline"
            fontSize="24px"
            color="#047cc0"
          />
        </button>
        <button className={styles.trashCan} title="Delete">
          <Ionicon icon="ios-trash-outline" fontSize="24px" color="#047cc0" />
        </button>
      </div>
      <div className={styles.content}>
        {props.loading ? "loading" : <IntentList list={props.intents} />}
      </div>
    </div>
  );
};

export default IntentPanel;
