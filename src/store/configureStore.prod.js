// @ flow

import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { routerMiddleware } from "react-router-redux";

import appReducers from "../reducers";

const configureStore = history => {
  const store = createStore(
    appReducers,
    compose(
      applyMiddleware(thunk, routerMiddleware(history)),
    )
  );

  return store;
};

export default configureStore;
