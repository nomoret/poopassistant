// import
// actions
const SET_ENTITY_LIST = "SET_ENTITY_LIST";

// action creators
function setEntityList(entityList) {
  console.log(entityList);
  return {
    type: SET_ENTITY_LIST,
    entityList
  };
}

// api action
function getEntityList() {
  console.log("entityList");
  return (dispatch, getState) => {
    fetch(`/nlp/entities`)
      .then(response => response.json())
      .then(json => dispatch(setEntityList(json)))
      .catch(err => console.log(err));
  };
}

// initial state
const initialState = {};

// reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_ENTITY_LIST:
      return applySetEntityList(state, action);
    default:
      return state;
  }
}

// reducer function
function applySetEntityList(state, action) {
  const { entityList } = action;
  return {
    ...state,
    entityList
  };
}

// export
const actionCreators = {
  getEntityList
};

export { actionCreators };

// deafult reducer export
export default reducer;
