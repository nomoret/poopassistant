import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";
import Ionicon from "react-ionicons";
import ExampleRow from "components/ExampleRow";

const IntentEditor = props => {
  console.log(props);
  return (
    <div className={styles.overlay}>
      <aside className={styles.page}>
        <section className={styles.content}>
          <form className={styles.form} onSubmit={props.handleSubmit}>
            <div className={styles.header}>
              <div className={styles.title}>
                <span className={styles.close} onClick={props.closeEdit}>
                  <Ionicon
                    icon="md-arrow-back"
                    fontSize="32px"
                    color="#56acf2"
                  />
                </span>
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
                        name="name"
                        value={props.name}
                        onChange={props.handleInputChange}
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
                      name="description"
                      value={props.description}
                      onChange={props.handleInputChange}
                      disabled={props.name !== "" ? "" : "disabled"}
                    />
                  </div>
                </div>
                {props.id && !props.loading && (
                  <div className={styles.inputDescription}>
                    <div>
                      <label className={styles.labelName}>
                        Add user examples
                      </label>
                    </div>
                    <div className={styles.underLine}>
                      <input
                        className={styles.input}
                        type="text"
                        placeholder="Add user examples to this intent"
                        name="example"
                        value={props.example}
                        onChange={props.handleInputChange}
                      />
                    </div>
                  </div>
                )}
                {props.id && !props.loading ? (
                  <div>
                    <button
                      className={
                        props.name !== ""
                          ? styles.createIntent
                          : styles.createIntentDisable
                      }
                      placeholder="Create Intent"
                    >
                      Create Intent
                    </button>
                  </div>
                ) : (
                  <div>
                    <button
                      className={
                        props.example !== ""
                          ? styles.createIntent
                          : styles.createIntentDisable
                      }
                      placeholder="Add example"
                    >
                      Create Intent
                    </button>
                  </div>
                )}
              </div>
              {!props.id && (
                <div className={styles.noExample}>
                  <div className={styles.title}>No examples yet.</div>
                  <div className={styles.decription}>
                    Train your virtual assistant with this intent by adding
                    unique examples of what your users would say.
                  </div>
                </div>
              )}
              {props.id && props.loading && <div>loading</div>}
              {props.id && !props.loading && (
                <div className={styles.examples}>
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
                      {props.examples.map((example, index) => {
                        return (
                          <ExampleRow
                            key={example.id}
                            index={index}
                            example={example.example}
                            creator={example.creator}
                          />
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </form>
        </section>
      </aside>
    </div>
  );
};

IntentEditor.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
  examples: PropTypes.array,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  closeEdit: PropTypes.func.isRequired
};

export default IntentEditor;
