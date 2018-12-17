import { connect } from "react-redux";
import { actionCreators as userActions } from "redux/modules/users";
import Container from "./container";

const mapDispatchToProps = dispatch => {
  return {
    userLogin: (username, password) => {
      dispatch(userActions.userLogin(username, password));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Container);
