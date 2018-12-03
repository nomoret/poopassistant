import React from "react";
import styles from "./styles.module.scss";
import { Route, Switch } from "react-router-dom";
import Sidebar from "components/SideBar";
import Intents from "components/Intents";
import Entities from "components/Entities";
import ChatPanel from "components/ChatPanel";
import Navigation from "components/Navigation";

const App = props => (
  <div className={styles.app}>
    <Navigation />
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
        path="/"
        render={() => <div className={styles.appContent}>main</div>}
      />
    </Switch>
    <ChatPanel />
  </div>
);

export default App;
