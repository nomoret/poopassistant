import { connect } from "react-redux";
import { actionCreator } from "redux/modules/nodes";
import Container from "./container";

const mapStateToProps = state => {
  const {
    nodes: { tree }
  } = state;

  return {
    tree
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectEditNode: index => {
      dispatch(actionCreator.selectEditNode(index));
    },
    getNodeTree: () => {
      dispatch(actionCreator.getNodeTree());
    },
    addChildNode: index => {
      dispatch(actionCreator.addChildNode(index));
    },
    removeNode: index => {
      dispatch(actionCreator.removeNode(index));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
