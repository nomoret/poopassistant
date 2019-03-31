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
    <form>
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
              name="value"
              value={props.value}
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
              <button className={styles.btn} title="Export">
                <Ionicon icon="md-add-circle" fontSize="24px" color="#047cc0" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ValueInputs;
