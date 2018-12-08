import React from "react";
import styles from "./styles.module.scss";
import PropTypes from "prop-types";
import IntentList from "components/IntentList";

const IntentPanel = props => {
  console.log("UserList no stateless");
  console.log(props);
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {props.loading ? "loading" : <IntentList list={props.intents} />}
      </div>
    </div>
  );
};

IntentPanel.propTypes = {
  intents: PropTypes.array
};

export default IntentPanel;
