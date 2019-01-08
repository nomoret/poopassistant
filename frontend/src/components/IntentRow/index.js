import React from "react";
import styles from "./styles.module.scss";
import PropTypes from "prop-types";

const IntentRow = props => {
  const {
    intent: { name, description, modified_time, examples_count }
  } = props;

  const _handleSubmit = () => {
    const { intent, openEdit } = props;
    openEdit({ intent });
  };

  return (
    <tr className={props.index % 2 === 0 ? styles.evenRow : styles.oddRow}>
      <td className={styles.column}>
        <input type="checkbox" name="" value="intent" />
      </td>
      <td className={styles.column}>
        <span className={styles.intentEdit} onClick={_handleSubmit}>
          <span>#{name}</span>
        </span>
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

IntentRow.propTypes = {
  intent: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    modified_time: PropTypes.string.isRequired,
    examples_count: PropTypes.number.isRequired
  }).isRequired,
  openEdit: PropTypes.func.isRequired
};

export default IntentRow;
