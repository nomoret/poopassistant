import { connect } from "react-redux";
import { actionCreators } from "redux/modules/chattings";
import Container from "./container";

const mapStateToProps = state => {
  const {
    chattings: { response }
  } = state;

  return {
    response
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sendMessage: msg => {
      dispatch(actionCreators.sendMessage(msg));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
