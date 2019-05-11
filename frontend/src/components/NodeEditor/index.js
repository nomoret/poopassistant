import React from "react";
import styles from "./styles.module.scss";

const NodeEditor = props => {
  console.log("NodeEditor", props);
  return (
    <div className={styles.nodeEditor}>
      <header className={styles.nodeName}>
        <input type="text" placeholder="Name this node.." />
        <div>
          <span>⚙ Customize</span>
        </div>
        <div className={styles.hdrBtn} onClick={props.closeEdit}>
          <span role="img" aria-label="gear">
            ❌
          </span>
        </div>
      </header>
      <div className={styles.editor}>
        <section className={styles.conditon}>
          <h3>If assistant recognizes:</h3>
          <div>
            <input
              type="text"
              placeholder="Enter the intent, entity or context varibales..."
            />
            <span role="img" aria-label="gear">
              ❌
            </span>
          </div>
        </section>
        <section className={styles.resonse}>
          <h3>This respond with</h3>
        </section>
        <section className={styles.afterResponse}>
          <h3>And finally</h3>
          <div>DropDown</div>
        </section>
      </div>
    </div>
  );
};

export default NodeEditor;
