import React from "react";
import styles from "./styles.module.scss";
import Ionicon from "react-ionicons";

const NodeEditor = props => {
  console.log("NodeEditor", props);
  return (
    <div className={styles.nodeEditor}>
      <header className={styles.header}>
        <div className={styles.nodeName}>
          <input
            className={styles.nodeNameInput}
            type="text"
            placeholder="Name this node.."
            name="title"
            value={props.title}
            onChange={props.handleInputChange}
            onKeyPress={props.handleEnterKeyDown}
          />
        </div>
        <div className={styles.action}>
          <div>
            <Ionicon
              icon="ios-settings-outline"
              fontSize="24px"
              color="#047cc0"
            />
            <span>Customize</span>
          </div>
          <div className={styles.hdrBtn} onClick={props.closeEdit}>
            <Ionicon icon="ios-close" fontSize="48px" color="#047cc0" />
          </div>
        </div>
      </header>
      <div className={styles.editor}>
        <section className={styles.condition}>
          <div>If assistant recognizes:</div>
          <div className={styles.builder}>
            <input
              className={styles.input}
              type="text"
              placeholder="Enter the intent, entity or context varibales..."
            />
            <div className={styles.remove}>
              <Ionicon
                icon="ios-remove-circle-outline"
                fontSize="24px"
                color="#047cc0"
              />
            </div>
            <div className={styles.add}>
              <Ionicon
                icon="ios-add-circle-outline"
                fontSize="24px"
                color="#047cc0"
              />
            </div>
          </div>
          <div className={styles.item}>
            {props.message && <div>{`# ${props.message.name}`}</div>}
          </div>
        </section>
        {/* <section className={styles.cotenxt}>
          <div>This Set Context</div>
          <div>
            <label>Variable</label>
            <label>Value</label>
          </div>
          <div className={styles.contextList}>
            <div className={styles.contextItem}>
              <span>$</span>
              <input type="text" name="Variable" />
              <input type="text" name="Value" />
              <span role="img" aria-label="trash">
                  🗑
              </span>
            </div>
            <div className={styles.add}>
              <Ionicon
                icon="ios-add-circle-outline"
                fontSize="24px"
                color="#047cc0"
              />
              <span>Add Variable</span>
            </div>
          </div>
        </section> */}
        <section className={styles.resonse}>
          <div>This respond with</div>
          <div>
            <input
              type="text"
              style={{ width: "100%" }}
              name="response"
              placeholder="Enter response variation"
              value={props.response}
              onChange={props.handleInputChange}
              onKeyPress={props.handleEnterKeyDown}
            />
          </div>
          {props.responses &&
            props.responses.map((response, index) => {
              console.log(response);
              return (
                <div className={styles.example} key={index} id={response.id}>
                  <input
                    className={styles.input}
                    type="text"
                    name={response.id}
                    value={response.example}
                  />
                  <div className={styles.remove}>
                    <Ionicon
                      icon="ios-remove-circle-outline"
                      fontSize="28px"
                      color="#047cc0"
                    />
                  </div>
                </div>
              );
            })}
        </section>
        <section className={styles.afterResponse}>
          <h3>And finally</h3>
          <div>DropDown</div>
          <div>Wait for user input</div>
        </section>
      </div>
    </div>
  );
};

export default NodeEditor;
