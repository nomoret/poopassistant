import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";
import Ionicon from "react-ionicons";

const ActionButtons = props => {
  console.log("ActionButtons");
  console.log(props);
  return (
    <div className={styles.action}>
      <button
        className={styles.addIntent}
        title={`add ${props.name}`}
        onClick={props.add}
      >
        add {props.name}
      </button>
      <button className={styles.import} title={`Import ${props.name}s`}>
        <Ionicon
          icon="ios-cloud-upload-outline"
          fontSize="24px"
          color="#047cc0"
        />
      </button>
      <button className={styles.export} title="Export">
        <Ionicon icon="ios-download-outline" fontSize="24px" color="#047cc0" />
      </button>
      <button className={styles.trashCan} title="Delete">
        <Ionicon icon="ios-trash-outline" fontSize="24px" color="#047cc0" />
      </button>
    </div>
  );
};

ActionButtons.propTypes = {
  name: PropTypes.string,
  add: PropTypes.func.isRequired
};

export default ActionButtons;
