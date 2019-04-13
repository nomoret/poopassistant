import React from "react";
import styles from "./styles.module.scss";
import Ionicon from "react-ionicons";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from "reactstrap";

const ValueInputs = props => {
  console.log("ValueInput", props);
  return (
    <div>
      <div className={styles.valueSynonymContainer}>
        <div className={styles.valueInput}>
          <div>
            <label className={styles.labelName}>Add value</label>
          </div>
          <div className={styles.underLine}>
            <input
              className={styles.input}
              type="text"
              placeholder="Enter Value"
              name="valueInput"
              value={props.valueInput}
              onChange={props.handleInputChange}
            />
          </div>
        </div>
        <div className={styles.synonymInput}>
          <div className={styles.dropdown}>
            <Dropdown isOpen={props.dropdownOpen} toggle={props.toggle}>
              <DropdownToggle caret>Dropdown</DropdownToggle>
              <DropdownMenu>
                <DropdownItem>synonym</DropdownItem>
                <DropdownItem divider />
                <DropdownItem disabled>regex</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <div className={styles.synonymInputList}>
            <div>
              <label className={styles.labelName}>Synonym</label>
            </div>
            <div className={styles.underLine}>
              <input
                className={styles.input}
                type="text"
                placeholder="Enter Synonym"
                name="synonym"
                value={props.synonym}
                onChange={props.handleInputChange}
              />
              <button
                className={styles.addBtn}
                title="Add"
                onClick={props.handleAddSynonymClick}
              >
                <Ionicon icon="md-add-circle" fontSize="24px" color="#047cc0" />
              </button>
            </div>
            {props.synonyms.length > 0 &&
              props.synonyms.map((synonym, index) => (
                <div key={index}>
                  <div>
                    <span>{synonym}</span>
                    <button
                      className={styles.deleteBtn}
                      onClick={props.handleDeleteSynonymClick}
                      value={synonym}
                    >
                      <Ionicon
                        icon="md-remove-circle"
                        fontSize="24px"
                        color="#777677"
                        onClick={e => e.preventDefault()}
                      />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValueInputs;
