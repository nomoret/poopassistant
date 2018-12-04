import React from "react";
import styles from "./styles.module.scss";
import Ionicon from "react-ionicons";

const Navigation = () => (
  <div className={styles.navigation}>
    <div className={styles.inner}>
      <div className={styles.column}>
        <button className={styles.button} type="button">
          <svg width="20" height="20">
            <title>header menu</title>
            <path d="M3 4h14v1H3zM3 10h14v1H3zM3 16h14v1H3z" />
          </svg>
        </button>
        <span>
          {" "}
          Poop <b>Assisatant</b>
        </span>
      </div>
      <div className={styles.column} />
      <div className={styles.column}>Cookie Preferences</div>
      <div className={styles.column}>
        <div className={styles.naviIcon}>
          <Ionicon
            icon="ios-help-circle-outline"
            fontSize="32px"
            color="white"
          />
        </div>
        <div className={styles.naviIcon}>
          <Ionicon icon="ios-person-outline" fontSize="32px" color="white" />
        </div>
      </div>
    </div>
  </div>
);

export default Navigation;
