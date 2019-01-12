import React from "react";
import styles from "./styles.module.scss";
import PropTypes from "prop-types";
import BootstrapTable from "react-bootstrap-table-next";

function nameFormatter(cell, row) {
  return <span>#{cell}</span>;
}

const EntityTable = props => {
  console.log(props);
  const { entities, openEdit } = props;

  const selectRow = {
    mode: "checkbox",
    onSelectAll: props.selectAll,
    onSelect: props.selectRow,
    selected: props.selected
  };

  const columns = [
    {
      dataField: "name",
      text: "Name",
      formatter: nameFormatter,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          console.log(row);
          openEdit(row);
        }
      },
      classes: styles.intentEdit
    },
    {
      dataField: "created_at",
      text: "Created Time"
    },
    {
      dataField: "modified_time",
      text: "Updated Time"
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
