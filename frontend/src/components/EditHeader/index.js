import React from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import Ionicon from "react-ionicons";

const EditHeader = props => (
  <div className={styles.container}>
    <header className={styles.header}>
      <div className={styles.breadcrumbs}>
        <ol className={styles.breadcrumb}>
          <li className={styles.item}>Chatbot</li>
          <li className={styles.item}>Domain</li>
          <li className={styles.item}>Build</li>
        </ol>
      </div>
      <div className={styles.column}>
        <button className={styles.button} onClick={props.openChatPanel}>
          <span>Try it!</span>
        </button>
      </div>
    </header>
    <div className={styles.subHeader}>
      <div className={styles.detail}>
        <h3 className={styles.h3}>테스트맨</h3>
        <div className={styles.description}>테스트 챗봇입니다.</div>
      </div>
      <div>
        <Ionicon icon="ios-more-outline" fontSize="24px" color="#047cc0" />
      </div>
    </div>
    <div className={styles.subNavi}>
      <nav>
        <ul className={styles.list}>
          <li className={styles.firstItem}>
            <Link to="/intents">Intent</Link>
          </li>
          <li className={styles.item}>
            <Link to="/entities">Entity</Link>
          </li>
          <li className={styles.item}>
            <Link to="/dialog">Dialog</Link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
);

export default EditHeader;
