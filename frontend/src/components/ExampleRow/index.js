import React from "react";
import styles from "./styles.module.scss";
import PropTypes from "prop-types";

const ExampleRow = props => {
  console.log(props);
  const { example, modified_time } = props;

  return (
    <tr className={props.index % 2 === 0 ? styles.evenRow : styles.oddRow}>
      <td className={styles.column}>
        <input type="checkbox" name="" value="example" />
      </td>
      <td className={styles.column}>
        <div>{example}</div>
      </td>
      <td className={styles.column}>
        <div>{modified_time}</div>
      </td>
    </tr>
  );
};

ExampleRow.propTypes = {
  example: PropTypes.string.isRequired,
  modified_time: PropTypes.string.isRequired,
  creator: PropTypes.shape({
    username: PropTypes.string.isRequired
  }).isRequired
};

export default ExampleRow;
