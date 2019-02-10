import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";
import ActionButtons from "components/ActionButtons";
import EntityTable from "components/EntityTable";
import EntityEditor from "components/EntityEditor";
import { Nav, NavItem, NavLink } from "reactstrap";

const EnityPanel = props => {
  console.log("UserList no stateless");
  console.log(props);
  return (
    <div className={styles.container}>
      <SubNavi />
      <ActionButtons
        name="entity"
        handleAdd={props.addEntity}
        handleDelete={props.removeEntity}
      />
      <div className={styles.content}>
        {props.loading ? (
          "loading"
        ) : (
          <EntityTable
            entities={props.entities}
            selected={props.selected}
            openEdit={props.openEdit}
            selectAll={props.selectAll}
            selectRow={props.selectRow}
          />
        )}
      </div>
      {props.seeingLikes ? <EntityEditor closeEdit={props.closeEdit} /> : null}
    </div>
  );
};

const SubNavi = () => (
  <Nav className={styles.navi}>
    <NavItem>
      <NavLink href="#">My entities</NavLink>
    </NavItem>
    <NavItem>
      <NavLink href="#">System entities</NavLink>
    </NavItem>
  </Nav>
);

EnityPanel.propTypes = {
  entities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      creator: PropTypes.shape({
        username: PropTypes.string.isRequired
      }),
      modified_time: PropTypes.string.isRequired
    }).isRequired
  ),
  selected: PropTypes.array.isRequired,
  addEntity: PropTypes.func.isRequired,
  removeEntity: PropTypes.func.isRequired,
  openEdit: PropTypes.func.isRequired,
  closeEdit: PropTypes.func.isRequired,
  selectAll: PropTypes.func.isRequired,
  selectRow: PropTypes.func.isRequired
};

export default EnityPanel;
