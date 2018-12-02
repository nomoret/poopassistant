import { combineReducers, createStore, applyMiddleware } from "redux";
import users from "redux/modules/users";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { composeWithDevTools } from "redux-devtools-extension";

const env = process.env.NODE_ENV;

const history = createBrowserHistory();

const middlewares = [thunk, routerMiddleware(history)];

if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

const reducer = history =>
  combineReducers({
    users,
    router: connectRouter(history)
  });

let store;
if (env === "development") {
  store = initialState =>
    createStore(
      reducer(history),
      composeWithDevTools(applyMiddleware(...middlewares))
    );
} else {
  store = initialState => createStore(reducer, applyMiddleware(...middlewares));
}

export { history };
export default store();
