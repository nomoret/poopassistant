// import
import { actionCreators as userAction } from "./users";

// actions
const SET_INTENT_LIST = "SET_INTENT_LIST";
const ADD_INTENT = "ADD_INTENT";
const SET_EXAMPLE_LIST = "SET_EXAMPLE_LIST";
const ADD_EXAMPLE = "ADD_EXAMPLE";

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

function setExampleList(exampleList) {
  console.log(exampleList);
  return {
    type: SET_EXAMPLE_LIST,
    exampleList
  };
}

function addExample(intentId, example) {
  console.log(example);
  return {
    type: ADD_EXAMPLE,
    intentId,
    example
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
      .then(json => {
        console.log(json);
        if (!json.detail) {
          dispatch(setIntentList(json));
        }
      })
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

function getExamples(intentId) {
  return (dispatch, getState) => {
    const {
      users: { token }
    } = getState();

    console.log(getState());
    fetch(`/nlp/intents/${intentId}/examples`, {
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
      .then(json => dispatch(setExampleList(json)))
      .catch(err => console.log(err));
  };
}

function createExample(intentId, example) {
  return (dispatch, getState) => {
    const {
      users: { token }
    } = getState();

    fetch(`/nlp/intents/${intentId}/examples`, {
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        example
      })
    })
      .then(response => response.json())
      .then(json => dispatch(addExample(intentId, json)))
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
    case SET_EXAMPLE_LIST:
      return applySetExampleList(state, action);
    case ADD_EXAMPLE:
      return applyAddExample(state, action);
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

function applySetExampleList(state, action) {
  const { exampleList } = action;
  return {
    ...state,
    exampleList
  };
}

function applyAddExample(state, action) {
  const { intentId, example } = action;
  const { intentList, exampleList } = state;

  console.log(example);

  const updatedIntent = intentList.map(intent => {
    if (intent.id === intentId) {
      return { ...intent, examples_count: intent.examples_count + 1 };
    }

    return intent;
  });

  return {
    ...state,
    intentList: updatedIntent,
    exampleList: [...exampleList, example]
  };
}

// export
const actionCreators = {
  getIntentList,
  createIntent,
  getExamples,
  createExample
};

export { actionCreators };

// deafult reducer export
export default reducer;
