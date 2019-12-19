import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";
import { Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";
import Sidebar from "components/SideBar";
import Auth from "components/Auth";
import EditHeader from "components/EditHeader";
import Intents from "components/IntentPanel";
import Entities from "components/EntityPanel";
import ChatPanel from "components/ChatPanel";
import Navigation from "components/Navigation";
import DialogContainer from "components/DialogContainer";
import Analytics from "components/Analytics";

const App = props => (
  <div className={styles.app}>
    <Navigation key={1} />
    {props.isLoggedIn ? (
      <PublicRoutes
        key={2}
        toggleChatPanel={props.toggleChatPanel}
        openChatPanel={props.openChatPanel}
        closeChatPanel={props.closeChatPanel}
      />
    ) : (
      <PrivateRoutes key={2} />
    )}
  </div>
);

App.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

const PublicRoutes = props => (
  <div className={styles.appContainer}>
    <Sidebar />
    <div className={styles.appContent}>
      <EditHeader openChatPanel={props.openChatPanel} />
      <Switch>
        <Route exact path="/intents" component={Intents} />
        <Route exact path="/entities" component={Entities} />
        <Route exact path="/dialog" component={DialogContainer} />
        <Route exact path="/deploy" component={Deploy} />
        <Route exact path="/improve" component={Analytics} />
        <Route path="/" component={BasicContainer} />
      </Switch>
    </div>
    {props.toggleChatPanel ? (
      <ChatPanel closeChatPanel={props.closeChatPanel} />
    ) : null}
  </div>
);

const BasicContainer = () => <div className={styles.appPanel}>main</div>;
const Deploy = () => <div className={styles.appPanel}>Deploy</div>;

const PrivateRoutes = props => (
  <div className={styles.appContainer}>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Log In</title>
    </Helmet>
    <div className={styles.appContent}>
      <Switch>
        <Route path="/" component={Auth} />
      </Switch>
    </div>
  </div>
);

export default App;
