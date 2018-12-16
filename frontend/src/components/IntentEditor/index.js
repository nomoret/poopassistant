import { connect } from "react-redux";
import { actionCreators as intentActions } from "redux/modules/intents";
import Container from "./container";

const mapDispatchToProps = dispatch => {
  return {
    createIntent: (name, description) => {
      dispatch(intentActions.createIntent(name, description));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Container);
