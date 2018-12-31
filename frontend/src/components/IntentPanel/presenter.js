import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";
import Ionicon from "react-ionicons";
import IntentList from "components/IntentList";
import IntentEditor from "components/IntentEditor";

const IntentPanel = props => {
  console.log("UserList no stateless");
  console.log(props);
  return (
    <div className={styles.container}>
      <div className={styles.action}>
        <button
          className={styles.addIntent}
          title="add Intent"
          onClick={props.addIntent}
        >
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
        {props.loading ? (
          "loading"
        ) : (
          <IntentList list={props.intents} openEdit={props.openEdit} />
        )}
      </div>
      {props.seeingLikes ? <IntentEditor closeEdit={props.closeEdit} /> : null}
    </div>
  );
};

IntentPanel.propTypes = {
  // id: PropTypes.number.isRequired,
  intents: PropTypes.arrayOf(
    PropTypes.shape({
      // id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      creator: PropTypes.number,
      examples_count: PropTypes.number.isRequired,
      modified_time: PropTypes.string.isRequired
    }).isRequired
  ),
  addIntent: PropTypes.func.isRequired,
  openEdit: PropTypes.func.isRequired,
  closeEdit: PropTypes.func.isRequired
};

export default IntentPanel;
