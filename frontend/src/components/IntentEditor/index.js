import React from "react";
import styles from "./styles.module.scss";

const IntentEditor = props => (
  <div className={styles.action}>
    <aside className={styles.overlayPage}>
      <section className={styles.section}>
        <form className={styles.form}>
          <div className={styles.header}>
            <div className={styles.title}>
              <button className={styles.close}>
                <span>close</span>
              </button>
              <div className={styles.verticalBar} />
              <div className={styles.intentName} />
            </div>
            <div className={styles.icon}>
              <button className={styles.export}>export</button>
              <button className={styles.export}>delete</button>
              <button className={styles.export}>search</button>
              <button className={styles.export}>try-it</button>
            </div>
          </div>
          <div className={styles.edit}>
            <div className={styles.inputIntent}>
              <div className={styles.inputName}>
                <div>
                  <label>Intent name</label>
                </div>
                <div className={styles.name}>
                  <span>#</span>
                  <input type="text" placeholder="name" />
                </div>
              </div>
              <div className={styles.inputDescription}>
                <div>
                  <label>description</label>
                </div>
                <input type="text" placeholder="description" />
              </div>
              <div className={styles.createIntent}>
                <button>Create Intent</button>
              </div>
            </div>
            <div className={styles.noExample}>
              <div>No examples yet.</div>
              <div>
                Train your virtual assistant with this intent by adding unique
                examples of what your users would say.
              </div>
            </div>
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
                  {/* {props.list.map((intent, index) => (
    <ExampleRow key={intent.id} index={index} intent={intent} />
  ))} */}
                </tbody>
              </table>
            </div>
          </div>
        </form>
      </section>
    </aside>
  </div>
);

export default IntentEditor;
