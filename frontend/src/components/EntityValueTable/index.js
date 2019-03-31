import { connect } from "react-redux";
import { actionCreators as enittyActions } from "redux/modules/entities";
import Container from "./container";

// const mapStateToProps = state => {
//   console.log("createIntent");
//   console.log(state);

//   const {
//     intents: { editIntent }
//   } = state;

//   if (editIntent) {
//     const { id, name, description, examples } = editIntent;
//     return {
//       id,
//       name,
//       description,
//       examples: examples ? examples : []
//     };
//   } else {
//     return null;
//   }
// };

const mapDispatchToProps = dispatch => {
  return {
    deleteEntityValue: entityValueId => {
      dispatch(enittyActions.deleteEntityValue(entityValueId));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Container);
