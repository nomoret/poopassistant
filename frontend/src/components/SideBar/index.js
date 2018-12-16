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
          <Ionicon
            className={styles.icon}
            icon="md-arrow-round-back"
            fontSize="32px"
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.naviIcon}>
          <Link to="/intents">
            <Ionicon
              className={styles.icon}
              icon="ios-construct-outline"
              fontSize="32px"
            />
          </Link>
        </div>
      </div>
      <div className={styles.row}>
        <Link to="/deploy">
          <Ionicon
            className={styles.icon}
            icon="ios-build-outline"
            fontSize="32px"
          />
        </Link>
      </div>
      <div className={styles.row}>
        <Link to="/improve">
          <Ionicon
            className={styles.icon}
            icon="ios-trending-up"
            fontSize="32px"
          />
        </Link>
      </div>
      <div className={styles.row}>{/* <li>deploy</li> */}</div>
    </ul>
  </div>
);

export default Sidebar;
