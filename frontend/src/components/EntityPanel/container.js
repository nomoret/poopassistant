import React, { Component } from "react";
import EnityPanel from "./presenter";
import PropTypes from "prop-types";

class Container extends Component {
  state = {
    loading: true,
    seeingLikes: false
  };

  static propTypes = {
    getEntityList: PropTypes.func.isRequired,
    entityList: PropTypes.array
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
        addEnitiy={this._addEnitiy}
        openEdit={this._openEdit}
        closeEdit={this._closeEdit}
      />
    );
  }

  _addEnitiy = () => {
    console.log("addEnitiy");
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

    // const {
    //   Enitiy: { id }
    // } = props;
    //get editEnitiy
    // const { getEnitiy } = this.props;
    // getEnitiy(id);
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
}
export default Container;
