import React from "react";
import styles from "./styles.module.scss";
import ChatCard from "components/Card";

const ChatPanel = props => (
  <div className={styles.container}>
    <ChatCard {...props} />
  </div>
);

export default ChatPanel;
