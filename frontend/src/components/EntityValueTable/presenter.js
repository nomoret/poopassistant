import React from "react";
import styles from "./styles.module.scss";
import PropTypes from "prop-types";
import BootstrapTable from "react-bootstrap-table-next";

const EntityValueTable = props => {
  console.log("EntityValue", props);
  const { values } = props;

  const selectRow = {
    mode: "checkbox",
    onSelectAll: props.selectAll,
    onSelect: props.selectRow,
    selected: props.selected
  };

  const _countFormatter = column => {
    return (
      <span>
        {column.text} {`( ${values.length} )`}
      </span>
    );
  };

  const _valuesFormatter = (cell, row) => {
    console.log(cell);

    if (typeof cell !== "undefined" && cell.length > 0) {
      return (
        <span>
          {cell.map((value, index) => {
            const { text } = value;
            if (index === cell.length - 1) {
              return text;
            } else {
              return `${text}, `;
            }
          })}
        </span>
      );
    } else {
      return <span />;
    }
  };

  const columns = [
    {
      dataField: "entity_value_name",
      text: "Entity values",
      headerFormatter: _countFormatter
    },
    {
      dataField: "entity_type",
      text: "Type"
    },
    {
      dataField: "entity_synonym",
      text: "",
      formatter: _valuesFormatter
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.action}>
        <EntityValueAction selected={props.selected} />
      </div>
      <BootstrapTable
        hover
        striped
        keyField="id"
        data={values}
        columns={columns}
        selectRow={selectRow}
      />
    </div>
  );
};

const EntityValueAction = props => {
  if (props.selected && props.selected.length > 0) {
    return (
      <div className={styles.valueAction}>
        <div>
          <button className={styles.button}>Delete</button>
        </div>
        <div>
          {props.selected.length > 1 ? (
            <span className={styles.description}>
              {`${props.selected.length} items selected`}
            </span>
          ) : (
            <span className={styles.description}>
              {`${props.selected.length} item selected`}
            </span>
          )}

          <button className={styles.button}>Cancel</button>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

EntityValueTable.propTypes = {
  values: PropTypes.array
};

export default EntityValueTable;
