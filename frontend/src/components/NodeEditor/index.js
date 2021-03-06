import { connect } from "react-redux";
import { actionCreator } from "redux/modules/nodes";
import Container from "./container";

const mapStateToProps = state => {
  const {
    nodes: { editNode },
    intents: { intentList }
  } = state;

  console.log("im node editor!!!!", editNode);

  return {
    editNode,
    intentList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateEditNode: (index, node) => {
      return dispatch(actionCreator.updateEditNode(index, node));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
