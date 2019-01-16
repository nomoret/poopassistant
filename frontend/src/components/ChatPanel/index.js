import React from "react";
import styles from "./styles.module.scss";
import ChatCard from "components/Card";

const ChatPanel = () => (
  <div className={styles.container}>
    <ChatCard />
  </div>
);

export default ChatPanel;
