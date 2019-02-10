import React from "react";
import styles from "./styles.module.scss";
import PropTypes from "prop-types";
import BootstrapTable from "react-bootstrap-table-next";

const EntityValueTable = props => {
  console.log(props);
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
            const { entity_value_name } = value;
            if (index === cell.length - 1) {
              return entity_value_name;
            } else {
              return `${entity_value_name}, `;
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

EntityValueTable.propTypes = {
  values: PropTypes.array
};

export default EntityValueTable;
