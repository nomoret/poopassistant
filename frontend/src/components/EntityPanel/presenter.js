import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";
import ActionButtons from "components/ActionButtons";
import EntityTable from "components/EntityTable";
import { Nav, NavItem, NavLink } from "reactstrap";

const EnityPanel = props => {
  console.log("UserList no stateless");
  console.log(props);
  return (
    <div className={styles.container}>
      <SubNavi />
      <ActionButtons name="entity" add={props.addEntity} />
      <div className={styles.content}>
        {props.loading ? (
          "loading"
        ) : (
          <EntityTable entities={props.entities} openEdit={props.openEdit} />
        )}
      </div>
      {/* {props.seeingLikes ? <EnitityEditor closeEdit={props.closeEdit} /> : null} */}
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
      entity_name: PropTypes.string.isRequired,
      creator: PropTypes.shape({
        username: PropTypes.string.isRequired
      }),
      created_at: PropTypes.string.isRequired,
      updated_at: PropTypes.string.isRequired
    }).isRequired
  ),
  addEntity: PropTypes.func.isRequired,
  openEdit: PropTypes.func.isRequired,
  closeEdit: PropTypes.func.isRequired
};

export default EnityPanel;
