import React from "react";
import styles from "./styles.module.scss";
import PropTypes from "prop-types";

const Intents = props => {
  console.log("UserList no stateless");
  console.log(props);
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.content}>
          {props.loading ? "loading" : <RenderIntents list={props.intents} />}
        </div>
      </div>
    </div>
  );
};

const RenderIntents = props => {
  console.log(props);
  return props.list.map(intent => <UserRow key={intent.id} intent={intent} />);
};

const UserRow = props => {
  const {
    intent: { created_at, description, name, updated_at }
  } = props;
  console.log(props);
  return (
    <span className={styles.column}>
      <div>{name}</div>
      <div>{description}</div>
      <div>{created_at}</div>
      <div>{updated_at}</div>
    </span>
  );
};

Intents.propTypes = {
  intentList: PropTypes.array
};

export default Intents;
