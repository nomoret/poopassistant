import React from "react";
import styles from "./styles.module.scss";
import PropTypes from "prop-types";
import IntentRow from "components/IntentRow";

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
          <IntentRow
            key={intent.id}
            index={index}
            intent={intent}
            openEdit={props.openEdit}
            selectAll={props.selectAll}
            selectRow={props.selectRow}
          />
        ))}
      </tbody>
    </table>
  );
};

IntentList.propTypes = {
  intents: PropTypes.array
};

export default IntentList;
