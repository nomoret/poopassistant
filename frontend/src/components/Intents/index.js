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

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getIntentList: () => {
      dispatch(intentActions.getIntentList());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
