// import
import { actionCreators as userAction } from "redux/modules/users";

// actions
const SET_ENTITY_LIST = "SET_ENTITY_LIST";
const ADD_ENTITY = "ADD_ENTITY";

// action creators
function setEntityList(entityList) {
  console.log(entityList);
  return {
    type: SET_ENTITY_LIST,
    entityList
  };
}

function addEntity(entity) {
  console.log(entity);
  return {
    type: ADD_ENTITY,
    entity
  };
}

// api action
function getEntityList() {
  console.log("entityList");
  return (dispatch, getState) => {
    const {
      users: { token }
    } = getState();

    fetch(`/nlp/entities`, {
      headers: {
        Authorization: `JWT ${token}`
      }
    })
      .then(response => {
        console.log(response.status);
        if (response.status === 401) {
          dispatch(userAction.logout());
        }
        return response.json();
      })
      .then(json => {
        if (json.detail) {
          dispatch(userAction.logout());
        } else {
          dispatch(setEntityList(json));
        }
      })
      .catch(err => console.log(err));
  };
}

function createEntity(name) {
  return (dispatch, getState) => {
    console.log(name);
    const {
      users: { token }
    } = getState();

    fetch(`/nlp/entities`, {
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        name
      })
    })
      .then(response => response.json())
      .then(json => dispatch(addEntity(json)))
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
    case ADD_ENTITY:
      return applyAddEntity(state, action);
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

function applyAddEntity(state, action) {
  const { entity } = action;
  return {
    ...state,
    entity
  };
}

// export
const actionCreators = {
  getEntityList,
  createEntity
};

export { actionCreators };

// deafult reducer export
export default reducer;
