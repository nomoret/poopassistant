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
    editNode: node => {
      dispatch(actionCreator.selectEditNode(node));
    },
    getNodeTree: () => {
      dispatch(actionCreator.getNodeTree());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
