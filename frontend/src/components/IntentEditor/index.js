import { connect } from "react-redux";
import { actionCreators as intentActions } from "redux/modules/intents";
import Container from "./container";

const mapStateToProps = state => {
  console.log("createIntent");
  console.log(state);

  const {
    intents: { editIntent }
  } = state;

  if (editIntent) {
    const { id, name, description, examples } = editIntent;
    return {
      id,
      name,
      description,
      examples: examples ? examples : []
    };
  } else {
    return null;
  }
};

const mapDispatchToProps = dispatch => {
  return {
    createIntent: (name, description) => {
      dispatch(intentActions.createIntent(name, description));
    },
    getExamples: intentId => {
      dispatch(intentActions.getExamples(intentId));
    },
    createExample: (intentId, example) => {
      dispatch(intentActions.createExample(intentId, example));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
