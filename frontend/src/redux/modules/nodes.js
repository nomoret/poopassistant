const EDIT_CURRENT_NODE = "EDIT_CURRENT_NODE";
const GET_NODE_TREE = "GET_NODE_TREE";

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

function selectEditNode(node) {
  return (dispatch, getState) => {
    dispatch(setEditCurrentNode(node));
  };
}

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
      .then(response => response.json())
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

const actionCreator = {
  selectEditNode,
  getNodeTree
};

export { actionCreator };
export default reducer;
