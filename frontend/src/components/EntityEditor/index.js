import { connect } from "react-redux";
import { actionCreators as entityActions } from "redux/modules/entities";
import Container from "./container";

const mapStateToProps = state => {
  console.log("createEntity");
  console.log(state);

  const {
    entities: { entity }
  } = state;

  return {
    entity
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createEntity: name => {
      dispatch(entityActions.createEntity(name));
    },
    createEntityValue: (entitiyId, name) => {
      dispatch(entityActions.createEntityValue(entitiyId, name));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
