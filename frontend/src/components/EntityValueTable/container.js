import React, { Component } from "react";
import PropTypes from "prop-types";
import EntityValueTable from "./presenter";

class Container extends Component {
  state = {
    selected: []
  };

  static propTypes = {
    // closeEdit: PropTypes.func.isRequired,
    // createIntent: PropTypes.func.isRequired,
    // getExamples: PropTypes.func.isRequired,
    // createExample: PropTypes.func.isRequired
    deleteEntityValue: PropTypes.func.isRequired
  };

  render() {
    console.log(this.state);
    const { selected } = this.state;
    return (
      <EntityValueTable
        selected={selected}
        selectAll={this._selectAll}
        selectRow={this._selectRow}
        selectedDelete={this._selectedDelete}
        {...this.props}
      />
    );
  }

  _selectAll = (isSelect, rows) => {
    console.log(isSelect, rows);
    if (isSelect) {
      this.setState({
        selected: rows.map(row => row.id)
      });
    } else {
      this.setState({
        selected: []
      });
    }
  };

  _selectRow = ({ id }, isSelected) => {
    console.log(id, isSelected);
    const { selected } = this.state;
    if (isSelected) {
      this.setState({
        selected: [...selected, id].sort()
      });
    } else {
      this.setState({ selected: selected.filter(it => it !== id) });
    }

    return false;
  };

  _selectedDelete = event => {
    event.preventDefault();

    const { deleteEntityValue } = this.props;

    const { selected } = this.state;

    console.log("_selectedDelete", selected);
    if (selected) {
      selected.map(row => deleteEntityValue(row));
    }
  };
}

export default Container;
