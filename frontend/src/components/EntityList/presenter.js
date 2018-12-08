import React from "react";
import styles from "./styles.module.scss";
import PropTypes from "prop-types";

const Entities = props => {
  console.log("UserList no stateless");
  console.log(props);
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.content}>
          {props.loading ? "loading" : <RenderEntities list={props.entites} />}
        </div>
      </div>
      <WatsonIntent />
    </div>
  );
};

const RenderEntities = props => {
  console.log(props);
  return props.list.map(entity => <UserRow key={entity.id} entity={entity} />);
};

const UserRow = props => {
  const {
    entity: {
      creator: { username },
      entity_name,
      created_at,
      updated_at
    }
  } = props;
  console.log(props);
  return (
    <span className={styles.column}>
      <div>{entity_name}</div>
      <div>{username}</div>
      <div>{created_at}</div>
      <div>{updated_at}</div>
    </span>
  );
};

const WatsonIntent = () => {
  return (
    <div>
      <table />
      {/* <Table>
        <TableHead>
          <TableRow header>
            <TableHeader>First Name</TableHeader>
            <TableHeader>Last Name</TableHeader>
            <TableHeader>House</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableData>Harry</TableData>
            <TableData>Potter</TableData>
            <TableData>Gryffindor</TableData>
          </TableRow>
          <TableRow>
            <TableData>Hermoine</TableData>
            <TableData>Granger</TableData>
            <TableData>Gryffindor</TableData>
          </TableRow>
          <TableRow>
            <TableData>Blaise</TableData>
            <TableData>Zambini</TableData>
            <TableData>Slytherin</TableData>
          </TableRow>
          <TableRow>
            <TableData>Jon</TableData>
            <TableData>Snow</TableData>
            <TableData>Stark</TableData>
          </TableRow>
        </TableBody>
      </Table> */}
    </div>
  );
};

Entities.propTypes = {
  entities: PropTypes.array
};

export default Entities;
