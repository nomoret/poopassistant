import React from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import Ionicon from "react-ionicons";

const Sidebar = () => (
  <div className={styles.sidebar}>
    <button className={styles.closeBtn}>
      <Ionicon icon="md-close" fontSize="32px" color="white" />
    </button>
    <ul className={styles.list}>
      <div className={styles.row}>
        <div className={styles.naviIcon}>
          <Ionicon icon="md-arrow-round-back" fontSize="32px" color="#56acf2" />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.naviIcon}>
          <Link to="/intents">
            <Ionicon
              icon="ios-construct-outline"
              fontSize="32px"
              color="#56acf2"
            />
          </Link>
        </div>
      </div>
      <div className={styles.row}>
        <Link to="/intents">
          <Ionicon icon="ios-build-outline" fontSize="32px" color="#56acf2" />
        </Link>
      </div>
      <div className={styles.row}>
        <Link to="/entities">
          <Ionicon icon="ios-trending-up" fontSize="32px" color="#56acf2" />
        </Link>
      </div>
      <div className={styles.row}>{/* <li>deploy</li> */}</div>
    </ul>
  </div>
);

export default Sidebar;
