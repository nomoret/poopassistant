import React, { Component } from "react";
import Entities from "./presenter";
import PropTypes from "prop-types";

class Container extends Component {
  state = {
    loading: true
  };

  static propTypes = {
    getEntityList: PropTypes.func.isRequired,
    entityList: PropTypes.array
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
    return <Entities {...this.state} entites={entityList} />;
  }
}
export default Container;
