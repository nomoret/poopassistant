import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";
import { Route, Switch } from "react-router-dom";
import Sidebar from "components/SideBar";
import Auth from "components/Auth";
import EditHeader from "components/EditHeader";
import Intents from "components/IntentPanel";
import Entities from "components/EntityList";
import ChatPanel from "components/ChatPanel";
import Navigation from "components/Navigation";

const App = props => (
  <div className={styles.app}>
    <Navigation key={1} />
    {props.isLoggedIn ? <PublicRoutes key={2} /> : <PrivateRoutes key={2} />}
  </div>
);

App.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

const PublicRoutes = props => (
  <div className={styles.appContainer}>
    <Sidebar />
    <div className={styles.appContent}>
      <EditHeader />
      <Switch>
        <Route exact path="/intents" component={Intents} />
        <Route exact path="/entities" component={Entities} />
        <Route exact path="/dialog" component={Dialog} />
        <Route exact path="/deploy" component={Deploy} />
        <Route exact path="/improve" component={Improve} />
        <Route path="/" component={BasicContainer} />
      </Switch>
    </div>
    <ChatPanel />
  </div>
);

const BasicContainer = () => <div className={styles.appPanel}>main</div>;
const Dialog = () => <div className={styles.appPanel}>Dialog</div>;
const Deploy = () => <div className={styles.appPanel}>Deploy</div>;
const Improve = () => <div className={styles.appPanel}>Improve</div>;

const PrivateRoutes = props => (
  <div className={styles.appContainer}>
    <div className={styles.appContent}>
      <Switch>
        <Route path="/" component={Auth} />
      </Switch>
    </div>
  </div>
);

export default App;