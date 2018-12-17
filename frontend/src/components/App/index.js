import { connect } from "react-redux";
import Container from "./container";

const mapToStateProps = state => {
  const {
    users,
    router: { location }
  } = state;

  console.log(state);

  return {
    isLoggedIn: users.isLoggedIn,
    pathname: location.pathname
  };
};

export default connect(mapToStateProps)(Container);
