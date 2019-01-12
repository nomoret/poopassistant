import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";
import Ionicon from "react-ionicons";
import ExampleRow from "components/ExampleRow";
import Loading from "components/Loading";

const EntityEditor = props => {
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
                <div className={styles.entityName} />
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
              <div className={styles.inputEntity}>
                <div className={styles.inputName}>
                  <div>
                    <label className={styles.labelName}>Entity name</label>
                  </div>
                  <div className={styles.name}>
                    <div className={styles.underLine}>
                      <span className={styles.entitySpan}>@</span>
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
                {props.id && !props.loading && (
                  <div className={styles.inputDescription}>
                    <div>
                      <label className={styles.labelName}>Add value</label>
                    </div>
                    <div className={styles.underLine}>
                      <input
                        className={styles.input}
                        type="text"
                        placeholder="Add user examples to this entity"
                        name="example"
                        value={props.example}
                        onChange={props.handleInputChange}
                      />
                    </div>
                  </div>
                )}
                {!props.id ? (
                  <div>
                    <button
                      className={
                        props.name !== ""
                          ? styles.createEntity
                          : styles.createEntityDisable
                      }
                      placeholder="Create Entity"
                    >
                      Create Entity
                    </button>
                  </div>
                ) : (
                  <div>
                    <button
                      className={
                        props.example !== ""
                          ? styles.createEntity
                          : styles.createEntityDisable
                      }
                      placeholder="Add example"
                    >
                      Add example
                    </button>
                  </div>
                )}
              </div>
              {!props.id && (
                <div className={styles.noExample}>
                  <div className={styles.title}>No values yet.</div>
                  <div className={styles.decription}>
                    Once you've named your entity, begin by adding values,
                    synonyms, and patterns to entities to help your virtual
                    assistant learn and understand important details that your
                    users mention.
                  </div>
                  <Loading />
                </div>
              )}
              {props.id && props.loading && <Loading />}
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
                            modified_time={example.modified_time}
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

EntityEditor.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  closeEdit: PropTypes.func.isRequired
};

export default EntityEditor;
