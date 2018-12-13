import React from "react";
import styles from "./styles.module.scss";
import Ionicon from "react-ionicons";

const IntentEditor = props => (
  <div className={styles.overlay}>
    <aside className={styles.page}>
      <section className={styles.content}>
        <form className={styles.form}>
          <div className={styles.header}>
            <div className={styles.title}>
              <button className={styles.close}>
                <Ionicon icon="md-arrow-back" fontSize="32px" color="#56acf2" />
              </button>
              <div className={styles.verticalBar} />
              <div className={styles.intentName} />
            </div>
            <div className={styles.icon}>
              <button className={styles.etcButton}>
                <Ionicon
                  icon="ios-download-outline"
                  fontSize="32px"
                  color="#047cc0"
                />
              </button>
              <button className={styles.etcButton}>
                <Ionicon
                  icon="ios-trash-outline"
                  fontSize="32px"
                  color="#047cc0"
                />
              </button>
              <button className={styles.etcButton}>
                <Ionicon
                  icon="ios-search-outline"
                  fontSize="32px"
                  color="#047cc0"
                />
              </button>
              <button className={styles.button}>
                <span>Try it!</span>
              </button>
            </div>
          </div>
          <div className={styles.inputSection}>
            <div className={styles.inputIntent}>
              <div className={styles.inputName}>
                <div>
                  <label className={styles.labelName}>Intent name</label>
                </div>
                <div className={styles.name}>
                  <div className={styles.underLine}>
                    <span className={styles.intentSpan}>#</span>
                    <input
                      className={styles.input}
                      type="text"
                      placeholder="name"
                    />
                  </div>
                </div>
              </div>
              <div className={styles.inputDescription}>
                <div>
                  <label className={styles.labelName}>description</label>
                </div>
                <div className={styles.underLine}>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder="description"
                  />
                </div>
              </div>
              <div>
                <button
                  className={styles.createIntent}
                  placeholder="Create Intent"
                >
                  Create Intent
                </button>
              </div>
            </div>
            <div className={styles.noExample}>
              <div className={styles.title}>No examples yet.</div>
              <div className={styles.decription}>
                Train your virtual assistant with this intent by adding unique
                examples of what your users would say.
              </div>
            </div>
            {/* <div className={styles.examples}>
              <table className={styles.table}>
                <thead className={styles.thead}>
                  <tr>
                    <th>
                      <input type="checkbox" name="" value="All" />
                    </th>
                    <th>User examples</th>
                    <th>Added</th>
                  </tr>
                </thead>
                <tbody className={styles.tbody}>
                  {props.list.map((intent, index) => (
                    <ExampleRow key={intent.id} index={index} intent={intent} />
                  ))}
                </tbody>
              </table>
            </div> */}
          </div>
        </form>
      </section>
    </aside>
  </div>
);

export default IntentEditor;
