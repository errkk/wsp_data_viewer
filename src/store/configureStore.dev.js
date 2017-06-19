// @ flow

import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { routerMiddleware } from "react-router-redux";

import appReducers from "../reducers";
import DevTools from "../containers/DevTools";

const configureStore = history => {
  const store = createStore(
    appReducers,
    compose(
      applyMiddleware(thunk, createLogger(), routerMiddleware(history)),
      DevTools.instrument()
    )
  );

  return store;
};

export default configureStore;
