import React from "react";
import styles from "./styles.module.scss";
import { Route, Switch } from "react-router-dom";
import Sidebar from "components/SideBar";
import EditHeader from "components/EditHeader";
import Intents from "components/IntentPanel";
import Entities from "components/EntityList";
import ChatPanel from "components/ChatPanel";
import Navigation from "components/Navigation";

const App = props => (
  <div className={styles.app}>
    <Navigation key={1} />
    <PublicRoutes key={2} />
  </div>
);

const PublicRoutes = props => (
  <div className={styles.appContainer}>
    <Sidebar />
    <div className={styles.appContent}>
      <EditHeader />
      <Switch>
        <Route exact path="/intents" component={Intents} />
        <Route exact path="/entities" component={Entities} />
        <Route path="/" component={BasicContainer} />
      </Switch>
    </div>
    <ChatPanel />
  </div>
);

const BasicContainer = () => <div className={styles.appContent}>main</div>;

export default App;
