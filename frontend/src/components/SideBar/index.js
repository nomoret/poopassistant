import React from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";

const Sidebar = () => (
  <div className={styles.sidebar}>
    <ul>
      <div className={styles.row}>
        <button />
      </div>
      <div className={styles.row}>
        <li>close</li>
      </div>
      <div className={styles.row}>
        <li>
          <Link to="/intents">intents</Link>
        </li>
      </div>
      <div className={styles.row}>
        <Link to="/entities">entities</Link>
      </div>
      <div className={styles.row}>
        <li>deploy</li>
      </div>
    </ul>
  </div>
);

export default Sidebar;
