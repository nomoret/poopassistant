// // TODO Unimplemented Code - Getting All Dialog Nodes
// import { actionCreator as intentAction } from "redux/modules/intents";
// import { actionCreator as entityAction } from "redux/modules/entites";
import { actionCreators as userAction } from "redux/modules/users";

const EDIT_CURRENT_NODE = "EDIT_CURRENT_NODE";
const GET_NODE_TREE = "GET_NODE_TREE";
const UPDATE_NODE = "UPDATE_NODE";
const REMOVE_NODE = "REMOVE_NODE";

function setEditCurrentNode(node) {
  return {
    type: EDIT_CURRENT_NODE,
    node
  };
}

function setNodeTree(tree) {
  return {
    type: GET_NODE_TREE,
    tree
  };
}

function setUpdatedNode(node) {
  return {
    type: UPDATE_NODE,
    node
  };
}

function setRemoveNode(tree) {
  return {
    type: REMOVE_NODE,
    tree
  };
}

function selectEditNode(index) {
  return (dispatch, getState) => {
    const {
      users: { token }
    } = getState();

    fetch(`/nlp/node/${index}`, {
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
      .then(json => dispatch(setEditCurrentNode(json)))
      .catch(err => console.log(err));
  };
}

function updateEditNode(index, editedNode) {
  return (dispatch, getState) => {
    const {
      users: { token }
    } = getState();

    fetch(`/nlp/node/${index}`, {
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(editedNode)
    })
      .then(response => {
        if (response.status === 401) {
          dispatch(userAction.logout());
        }

        return response.json();
      })
      .then(json => dispatch(setUpdatedNode(json)))
      .catch(err => console.log(err));
  };
}

function removeNode(index) {
  return async (dispatch, getState) => {
    const {
      users: { token }
    } = getState();

    const deleteNodeIndex = await fetch(`/nlp/node/${index}`, {
      headers: {
        Authorization: `JWT ${token}`
      },
      method: "DELETE"
    })
      .then(response => {
        if (response.status === 401) {
          dispatch(userAction.logout());
        }

        if (response.status === 204) {
          return index;
        }
      })
      .catch(err => console.log(err));

    const tree = await fetch(`/nlp/nodes`, {
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
      .catch(err => console.log(err));

    if (deleteNodeIndex === 401 || tree === 401) {
      dispatch(userAction.logout());
    }

    dispatch(setRemoveNode(tree));
  };
}

// TODO Unimplemented Code
// function getDialogInfos() {
//   return async (dispatch, getState) => {
//     const {
//       users: { token }
//     } = getState();

//     const intentList = await getIntentList(token);
//     const entityList = await getEntityList(token);
//     const trees = await getNodeTree(token);

//     if( intentList === 401 || entityList ===401 || trees === 401) {
//       return dispatch(userAction.logout())
//     }

//     dispatch(setIntentList(intentList))
//     dispatch(setEntityList(entityList))
//     dispatch(setNodeTree(trees))
//   };
// }

function getNodeTree() {
  return (dispatch, getState) => {
    const {
      users: { token }
    } = getState();

    fetch(`/nlp/nodes`, {
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
      .then(json => dispatch(setNodeTree(json)))
      .catch(err => console.log(err));
  };
}

const initialState = {};

function reducer(state = initialState, action) {
  switch (action.type) {
    case EDIT_CURRENT_NODE:
      return applyCurrentEditNode(state, action);
    case GET_NODE_TREE:
      return applyNodeTree(state, action);
    case UPDATE_NODE:
      return applyUpdateEditNode(state, action);
    case REMOVE_NODE:
      return applyRemoveNode(state, action);
    default:
      return state;
  }
}

function applyCurrentEditNode(state, action) {
  const { node } = action;

  return {
    ...state,
    editNode: node
  };
}

function applyNodeTree(state, action) {
  const { tree } = action;
  return {
    ...state,
    tree
  };
}

function applyUpdateEditNode(state, action) {
  const { node } = action;
  console.log(node);
  return {
    ...state,
    editNode: node
  };
}

function applyRemoveNode(state, action) {
  const { tree } = action;
  return {
    ...state,
    tree
  };
}

const actionCreator = {
  getNodeTree,
  removeNode,
  selectEditNode,
  updateEditNode
};

export { actionCreator };
export default reducer;
