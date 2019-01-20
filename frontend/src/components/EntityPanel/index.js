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
    },
    getEntity: entityId => {
      dispatch(enitityActions.getEntity(entityId));
    },
    deleteEntity: selected => {
      dispatch(enitityActions.deleteEntity(selected));
    },
    clearEditEntity: () => {
      dispatch(enitityActions.clearEditEntity());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
