import React from "react";
import styles from "./styles.module.scss";
import PropTypes from "prop-types";

const IntentList = props => {
  console.log(props);
  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr>
          <th>
            <input type="checkbox" name="" value="All" />
          </th>
          <th>Intents</th>
          <th>Description</th>
          <th>Modified</th>
          <th>Examples</th>
        </tr>
      </thead>
      <tbody className={styles.tbody}>
        {props.list.map((intent, index) => (
          <IntentRow key={intent.id} index={index} intent={intent} />
        ))}
      </tbody>
    </table>
  );
};

const IntentRow = (props, index) => {
  const {
    intent: { name, description, modified_time, examples_count }
  } = props;
  console.log(props);

  return (
    <tr className={props.index % 2 === 0 ? styles.evenRow : styles.oddRow}>
      <td className={styles.column}>
        <input type="checkbox" name="" value="intent" />
      </td>
      <td className={styles.column}>
        <button className={styles.intentEdit}>
          <span>#{name}</span>
        </button>
      </td>
      <td className={styles.column}>
        <div>{description}</div>
      </td>
      <td className={styles.column}>
        <div>{modified_time}</div>
      </td>
      <td className={styles.column}>
        <div>{examples_count}</div>
      </td>
    </tr>
  );
};

IntentList.propTypes = {
  intents: PropTypes.array
};

export default IntentList;
