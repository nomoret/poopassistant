import React, { Component } from "react";
import EnityPanel from "./presenter";
import PropTypes from "prop-types";

class Container extends Component {
  state = {
    loading: true,
    seeingLikes: false,
    selected: []
  };

  static propTypes = {
    entityList: PropTypes.array,
    getEntityList: PropTypes.func.isRequired,
    getEntity: PropTypes.func.isRequired,
    deleteEntity: PropTypes.func.isRequired,
    clearEditEntity: PropTypes.func.isRequired
    // clearEnitiy: PropTypes.func.isRequired,
  };

  componentDidMount() {
    console.log("componentDidMount");
    const { getEntityList } = this.props;
    if (!this.props.entityList) {
      getEntityList();
    } else {
      this.setState({ loading: false });
    }
  }

  componentWillReceiveProps = nextProps => {
    console.log("componentWillReceiveProps");
    if (nextProps.entityList) {
      this.setState({
        loading: false
      });
    }
  };

  render() {
    const { entityList } = this.props;
    return (
      <EnityPanel
        {...this.state}
        entities={entityList}
        addEntity={this._addEntity}
        openEdit={this._openEdit}
        closeEdit={this._closeEdit}
        removeEntity={this._deleteEntity}
        selectRow={this._selectRow}
        selectAll={this._selectAll}
      />
    );
  }

  _addEntity = () => {
    console.log("addEnitiy");
    this.setState({
      seeingLikes: true
    });
    //clear editInent
    const { clearEditEntity } = this.props;
    clearEditEntity();
  };

  _openEdit = intent => {
    console.log("openEdit");
    this.setState({
      seeingLikes: true
    });

    console.log(intent);

    const { id } = intent;
    const { getEntity } = this.props;
    getEntity(id);
  };

  _deleteEntity = () => {
    console.log("deleteEnitiy");

    const { selected } = this.state;
    const { deleteEntity } = this.props;
    deleteEntity(selected);
  };

  _closeEdit = () => {
    console.log("closeEdit");
    this.setState({
      seeingLikes: false
    });

    //diff editEnitiy
    // const { clearEnitiy } = this.props;
    // clearEnitiy();
  };

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
}
export default Container;
