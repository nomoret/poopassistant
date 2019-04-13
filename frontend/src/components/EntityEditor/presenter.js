import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";
import Ionicon from "react-ionicons";
import EntityValueTable from "components/EntityValueTable";
import ValueInputs from "components/EntityValueInput";

const EntityEditor = props => {
  console.log(props);
  // if (props.loading) {
  //   return <Loading />;
  // } else
  if (props.entity) {
    const {
      id,
      creator: { username },
      entitiy_values,
      name
    } = props.entity;

    console.log(typeof props.name === undefined);
    return (
      <RenderEnityEditor
        id={id}
        name={props.name}
        // name={props.name !== undefined ? props.name : name}
        valueInput={props.valueInput}
        synonym={props.synonym}
        synonyms={props.synonyms}
        deafultName={name}
        username={username}
        values={entitiy_values}
        dropdownOpen={props.dropdownOpen}
        toggle={props.toggle}
        handleInputChange={props.handleInputChange}
        handleSubmit={props.handleSubmit}
        handleValueSubmit={props.handleValueSubmit}
        handleAddSynonymClick={props.handleAddSynonymClick}
        handleDeleteSynonymClick={props.handleDeleteSynonymClick}
        closeEdit={props.closeEdit}
        createEntity={props.createEntity}
      />
    );
  } else {
    return (
      <RenderEnityEditor
        valueInput={props.valueInput}
        dropdownOpen={props.dropdownOpen}
        toggle={props.toggle}
        handleInputChange={props.handleInputChange}
        handleSubmit={props.handleSubmit}
        closeEdit={props.closeEdit}
        createEntity={props.createEntity}
      />
    );
  }
};

const RenderEnityEditor = props => {
  console.log("RenderEnityEditor", props);
  return (
    <div className={styles.overlay}>
      <aside className={styles.page}>
        <section className={styles.content}>
          <div className={styles.form}>
            <EntityEditorHeader {...props} />
            <div className={styles.inputSection}>
              <EntityValueInput {...props} />
              {props.values && <EntityValueTable values={props.values} />}
            </div>
          </div>
        </section>
      </aside>
    </div>
  );
};

const EntityEditorHeader = props => (
  <div className={styles.header}>
    <div className={styles.title}>
      <span className={styles.close} onClick={props.closeEdit}>
        <Ionicon icon="md-arrow-back" fontSize="32px" color="#56acf2" />
      </span>
      <div className={styles.verticalBar} />
      <div className={styles.entityName} />
    </div>
    <div className={styles.icon}>
      <button className={styles.etcButton}>
        <Ionicon icon="ios-download-outline" fontSize="32px" color="#047cc0" />
      </button>
      <button className={styles.etcButton}>
        <Ionicon icon="ios-trash-outline" fontSize="32px" color="#047cc0" />
      </button>
      <button className={styles.etcButton}>
        <Ionicon icon="ios-search-outline" fontSize="32px" color="#047cc0" />
      </button>
      <button className={styles.button} onClick={e => e.preventDefault()}>
        <span>Try it!</span>
      </button>
    </div>
  </div>
);

const EntityValueInput = props => {
  console.log("EntityValueInput", props);
  return (
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
        <ValueInputs
          synonym={props.synonym}
          synonyms={props.synonyms}
          valueInput={props.valueInput}
          dropdownOpen={props.dropdownOpen}
          toggle={props.toggle}
          handleInputChange={props.handleInputChange}
          handleAddSynonymClick={props.handleAddSynonymClick}
          handleDeleteSynonymClick={props.handleDeleteSynonymClick}
        />
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
            onClick={props.handleSubmit}
          >
            Create Entity
          </button>
        </div>
      ) : (
        <div>
          <button
            className={
              props.valueInput !== ""
                ? styles.createEntity
                : styles.createEntityDisable
            }
            placeholder="Add value"
            onClick={props.handleValueSubmit}
          >
            Add value
          </button>
        </div>
      )}
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
