// import
import { actionCreators as userAction } from "./users";

// actions
const SET_INTENT_LIST = "SET_INTENT_LIST";
const ADD_INTENT = "ADD_INTENT";

// action creators
function setIntentList(intentList) {
  console.log(intentList);
  return {
    type: SET_INTENT_LIST,
    intentList
  };
}

function addIntent(intent) {
  console.log(intent);
  return {
    type: ADD_INTENT,
    intent
  };
}

// api action
function getIntentList() {
  return (dispatch, getState) => {
    const {
      users: { token }
    } = getState();

    console.log(getState());

    fetch(`/nlp/intents`, {
      headers: {
        Authorization: `JWT ${token}`
      }
    })
      .then(response => {
        if (response.status === 401) {
          dispatch(userAction.logout());
        }
        return response.json();
      })
      .then(json => dispatch(setIntentList(json)))
      .catch(err => console.log(err));
  };
}

function createIntent(name, description) {
  return (dispatch, getState) => {
    console.log(name);
    console.log(description);
    const {
      users: { token }
    } = getState();

    fetch(`/nlp/intents`, {
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        name,
        description
      })
    })
      .then(response => response.json())
      .then(json => dispatch(addIntent(json)))
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
    case ADD_INTENT:
      return applyAddIntent(state, action);
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

function applyAddIntent(state, action) {
  const { intent } = action;
  const { intentList } = state;
  return {
    ...state,
    intentList: [...intentList, intent]
  };
}

// export
const actionCreators = {
  getIntentList,
  createIntent
};

export { actionCreators };

// deafult reducer export
export default reducer;
