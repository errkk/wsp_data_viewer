// @flow

import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import datalog from "./datalog";

const defaultState = { title: "Title from the store" };

const entities = (state = defaultState, action) => {
  return state;
};

const appReducers = combineReducers({
  datalog,
  routing: routerReducer,
});

export default appReducers;
