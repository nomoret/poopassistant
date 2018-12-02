import React from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";

const Sidebar = () => (
  <div className={styles.sidebar}>
    <div className={styles.row}>
      <ul>close</ul>
      <ul>
        <Link to="/intents">intents</Link>
      </ul>
      <ul>
        <Link to="/entities">entities</Link>
      </ul>
      <ul>deploy</ul>
    </div>
  </div>
);

export default Sidebar;
