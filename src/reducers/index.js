// @flow

import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import datalog from "./datalog";


const appReducers = combineReducers({
  datalog,
  routing: routerReducer,
});

export default appReducers;
