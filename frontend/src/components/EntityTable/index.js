import React from "react";
import styles from "./styles.module.scss";
import PropTypes from "prop-types";
import BootstrapTable from "react-bootstrap-table-next";

const EntityTable = props => {
  console.log(props);
  const { entities, openEdit } = props;

  const selectRow = {
    mode: "checkbox",
    onSelectAll: props.selectAll,
    onSelect: props.selectRow,
    selected: props.selected
  };

  const _nameFormatter = (cell, row) => {
    return <span>@{cell}</span>;
  };

  const _countFormatter = column => {
    return (
      <span>
        {column.text} {`( ${entities.length} )`}
      </span>
    );
  };

  const _valuesFormatter = (cell, row) => {
    console.log(cell);
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
  };

  const columns = [
    {
      dataField: "name",
      text: "Entity",
      formatter: _nameFormatter,
      headerFormatter: _countFormatter,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          console.log(row);
          openEdit(row);
        }
      },
      classes: styles.intentEdit
    },
    {
      dataField: "values",
      text: "Values",
      formatter: _valuesFormatter
    },
    {
      dataField: "modified_time",
      text: "Modified"
    }
  ];

  return (
    <div className={styles.container}>
      <BootstrapTable
        hover
        striped
        keyField="id"
        data={entities}
        columns={columns}
        selectRow={selectRow}
      />
    </div>
  );
};

EntityTable.propTypes = {
  entities: PropTypes.array
};

export default EntityTable;
