// imports
// actions
const SAVE_TOKEN = "SAVE_TOKEN";
const LOGOUT = "LOGOUT";

// action creators
function saveToken(token) {
  return {
    type: SAVE_TOKEN,
    token
  };
}

function logout() {
  return {
    type: LOGOUT
  };
}

// api action
// api action
function userLogin(username, password) {
  return function(dispatch) {
    console.log("userLogin");
    console.log(username);
    console.log(password);
    fetch("/rest-auth/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password
      })
    })
      .then(response => response.json())
      .then(json => {
        if (json.token) {
          dispatch(saveToken(json.token));
        }
      })
      .catch(err => console.log(err));
  };
}

// initial state
// reducer
const initialState = {
  isLoggedIn: localStorage.getItem("jwt") ? true : false,
  token: localStorage.getItem("jwt")
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_TOKEN:
      return applySaveToken(state, action);
    case LOGOUT:
      return applyLogout(state, action);
    default:
      return state;
  }
}
// reducer functions
function applySaveToken(state, action) {
  console.log("applySaveToken");
  const { token } = action;
  localStorage.setItem("jwt", token);

  return {
    ...state,
    isLoggedIn: true,
    token
  };
}

function applyLogout(state, action) {
  localStorage.removeItem("jwt");
  return {
    isLoggedIn: false
  };
}

// exports
const actionCreators = {
  userLogin,
  logout
};

export { actionCreators };

// export reducer by default
export default reducer;
