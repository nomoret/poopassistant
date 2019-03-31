const SET_RESPOENSE_MESSAGE = "SET_RESPOENSE_MESSAGE";

function setResponseMessage(response) {
  return {
    type: SET_RESPOENSE_MESSAGE,
    response
  };
}

function sendMessage(msg) {
  return (dispatch, getState) => {
    const {
      users: { token }
    } = getState();

    fetch(`/nlp/api/v1/svm`, {
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        msg
      })
    })
      .then(response => response.json())
      .then(json => dispatch(setResponseMessage(json)))
      .catch(err => console.log(err));
  };
}

const initialState = {};

// reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_RESPOENSE_MESSAGE:
      return applySetResponse(state, action);
    default:
      return state;
  }
}

function applySetResponse(state, action) {
  console.log("applySetResponse");
  const { response } = action;
  console.log(response);
  return {
    ...state,
    response
  };
}

const actionCreators = {
  sendMessage
};

export { actionCreators };
export default reducer;
