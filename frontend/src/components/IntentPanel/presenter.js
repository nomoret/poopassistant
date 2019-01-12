import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";
import IntentList from "components/IntentList";
import IntentEditor from "components/IntentEditor";
import ActionButtons from "components/ActionButtons";

const IntentPanel = props => {
  console.log("UserList no stateless");
  console.log(props);
  return (
    <div className={styles.container}>
      <ActionButtons name="intent" handleAdd={props.addIntent} />
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
