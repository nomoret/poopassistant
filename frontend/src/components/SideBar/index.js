import React from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";

const Sidebar = () => (
  <div className={styles.sidebar}>
    <div className={styles.row}>
      <ul>close</ul>
    </div>
    <div className={styles.row}>
      <ul>
        <Link to="/intents">intents</Link>
      </ul>
    </div>
    <div className={styles.row}>
      <ul>
        <Link to="/entities">entities</Link>
      </ul>
    </div>
    <div className={styles.row}>
      <ul>deploy</ul>
    </div>
  </div>
);

export default Sidebar;
