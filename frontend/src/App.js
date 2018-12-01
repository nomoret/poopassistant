import React, { Component } from "react";
import styles from "./App.module.scss";

class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <header className={styles.appHeader}>
          <div>back btn icon</div>
          <div>ui name</div>
          <div>last modfied time</div>
          <div>export icon</div>
          <div>delete item</div>
          <div>seach item</div>
          <div>try it</div>
        </header>
        <div className={styles.appContainer}>
          <div className={styles.appSidebar}>side bar</div>
          <div className={styles.appContent}>item editor</div>
          <div className={styles.appPanel}>chat panel</div>
        </div>
      </div>
    );
  }
}

export default App;
