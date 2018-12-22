import { connect } from "react-redux";
import { actionCreators as intentActions } from "redux/modules/intents";
import Container from "./container";

const mapStateToProps = state => {
  console.log("createIntent");
  console.log(state);

  const {
    intents: { exampleList }
  } = state;

  return {
    examples: exampleList
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  console.log(ownProps);
  return {
    createIntent: (name, description) => {
      dispatch(intentActions.createIntent(name, description));
    },
    getExamples: intentId => {
      dispatch(intentActions.getExamples(intentId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
