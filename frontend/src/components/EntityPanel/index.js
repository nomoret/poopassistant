import { connect } from "react-redux";
import { actionCreators as enitityActions } from "redux/modules/entities";
import Container from "./container";

const mapStateToProps = state => {
  console.log("mapStateToProps");
  console.log(state);

  const {
    entities: { entityList }
  } = state;

  return {
    entityList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getEntityList: () => {
      dispatch(enitityActions.getEntityList());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
