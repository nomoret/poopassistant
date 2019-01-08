import React from "react";
import styles from "./styles.module.scss";
import PropTypes from "prop-types";
import BootstrapTable from "react-bootstrap-table-next";

function nameFormatter(cell, row) {
  return <span>#{cell}</span>;
}

const columns = [
  {
    dataField: "entity_name",
    text: "Name",
    formatter: nameFormatter,
    events: {
      onClick: (e, column, columnIndex, row, rowIndex) => {
        console.log(row);
      }
    },
    classes: styles.intentEdit
  },
  {
    dataField: "created_at",
    text: "Created Time"
  },
  {
    dataField: "updated_at",
    text: "Updated Time"
  }
];

const selectRow = {
  mode: "checkbox"
};

const EntityTable = props => {
  console.log(props);
  const { entities } = props;
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
