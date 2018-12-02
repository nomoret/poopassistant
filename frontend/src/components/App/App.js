import React from "react";
import styles from "./App.module.scss";
import { Route, Switch } from "react-router-dom";

const App = props => (
  <div className={styles.app}>
    <Navi />
    <PublicRoutes />
  </div>
);

const PublicRoutes = props => (
  <div className={styles.appContainer}>
    <Sidebar />
    <Switch>
      <Route exact path="/intents" component={Intents} />
      <Route exact path="/entities" component={Entities} />
      <Route
        exact
        path="/"
        render={() => <div className={styles.appContent}>main</div>}
      />
    </Switch>
    <ChatPanel />
  </div>
);

const Navi = () => (
  <div className={styles.appHeader}>
    <div>back btn icon</div>
    <div>ui name</div>
    <div>last modfied time</div>
    <div>export icon</div>
    <div>delete item</div>
    <div>seach item</div>
    <div>try it</div>
  </div>
);

const Sidebar = () => (
  <div className={styles.appSidebar}>
    <ul>close</ul>
    <ul>intent</ul>
    <ul>entity</ul>
    <ul>deploy</ul>
  </div>
);

const Intents = () => <div className={styles.appContent}>intent editor</div>;
const Entities = () => <div className={styles.appContent}>entity editor</div>;

const ChatPanel = () => <div className={styles.appPanel}>chat panel</div>;

export default App;
