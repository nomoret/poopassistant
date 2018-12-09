import React from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import Ionicon from "react-ionicons";

const Sidebar = () => (
  <div className={styles.sidebar}>
    <ul>
      <div className={styles.row}>
        <div className={styles.naviIcon}>
          <Ionicon icon="md-arrow-round-back" fontSize="32px" color="#56acf2" />
        </div>
      </div>
      <div className={styles.row}>
        <Ionicon icon="ios-build-outline" fontSize="32px" color="#56acf2" />
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
