import React, { Component } from "react";
import IntentPanel from "./presenter";
import PropTypes from "prop-types";

class Container extends Component {
  state = {
    loading: true,
    seeingLikes: false,
    selected: []
  };

  static propTypes = {
    getIntentList: PropTypes.func.isRequired,
    getIntent: PropTypes.func.isRequired,
    clearIntent: PropTypes.func.isRequired,
    deleteIntent: PropTypes.func.isRequired,
    intentList: PropTypes.array
  };

  componentDidMount() {
    console.log("componentDidMount");
    const { getIntentList } = this.props;
    if (!this.props.intentList) {
      getIntentList();
    } else {
      this.setState({ loading: false });
    }
  }

  componentWillReceiveProps = nextProps => {
    console.log("componentWillReceiveProps");
    if (nextProps.intentList) {
      this.setState({
        loading: false
      });
    }
  };

  render() {
    const { intentList } = this.props;
    return (
      <IntentPanel
        {...this.state}
        intents={intentList}
        addIntent={this._addIntent}
        openEdit={this._openEdit}
        closeEdit={this._closeEdit}
        selectAll={this._selectAll}
        selectRow={this._selectRow}
        selectedDelete={this._selectedDelete}
      />
    );
  }

  _addIntent = () => {
    console.log("addIntent");
    this.setState({
      seeingLikes: true
    });
    //clear editInent
  };

  _openEdit = props => {
    console.log("openEdit");
    this.setState({
      seeingLikes: true
    });

    const {
      intent: { id }
    } = props;
    //get editIntent
    const { getIntent } = this.props;
    getIntent(id);
  };

  _closeEdit = () => {
    console.log("closeEdit");
    this.setState({
      seeingLikes: false
    });

    //diff editIntent
    const { clearIntent } = this.props;
    clearIntent();
  };

  _selectAll = (isSelect, rows) => {
    // console.log(isSelect, rows);
    // if (isSelect) {
    //   this.setState({
    //     selected: rows.map(row => row.id)
    //   });
    // } else {
    //   this.setState({
    //     selected: []
    //   });
    // }
  };

  // _selectRow = ({ id }, isSelected) => {
  _selectRow = (row, isSelected) => {
    // event.preventDefault();
    // console.log(event.target);
    console.log(row, isSelected);
    const id = row.intent.id;
    console.log("row key", id);
    // console.log(id, isSelected);
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
    console.log("delete intent", this.state.selected);

    const { selected } = this.state;
    const { deleteIntent } = this.props;

    selected.map(intenId => deleteIntent(intenId));
  };
}
export default Container;
