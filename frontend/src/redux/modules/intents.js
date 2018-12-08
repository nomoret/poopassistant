// import
// actions
const SET_INTENT_LIST = "SET_INTENT_LIST";

// action creators
function setIntentList(intentList) {
  console.log(intentList);
  return {
    type: SET_INTENT_LIST,
    intentList
  };
}

// api action
function getIntentList() {
  return (dispatch, getState) => {
    fetch(`/nlp/all/intents`)
      .then(response => response.json())
      .then(json => dispatch(setIntentList(json)))
      .catch(err => console.log(err));
  };
}

// initial state
const initialState = {};

// reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_INTENT_LIST:
      return applySetIntentList(state, action);
    default:
      return state;
  }
}

// reducer function
function applySetIntentList(state, action) {
  const { intentList } = action;
  return {
    ...state,
    intentList
  };
}

// export
const actionCreators = {
  getIntentList
};

export { actionCreators };

// deafult reducer export
export default reducer;
