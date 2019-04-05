import { connect } from "react-redux";
import { actionCreators as intentActions } from "redux/modules/intents";
import Container from "./container";

const mapStateToProps = state => {
  console.log("mapStateToProps");
  console.log(state);

  const {
    intents: { intentList }
  } = state;

  return {
    intentList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getIntentList: () => {
      dispatch(intentActions.getIntentList());
    },
    getIntent: intentId => {
      dispatch(intentActions.getIntent(intentId));
    },
    clearIntent: () => {
      dispatch(intentActions.clearIntent());
    },
    deleteIntent: intentId => {
      dispatch(intentActions.deleteIntent(intentId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
