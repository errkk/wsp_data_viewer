// @flow

import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import datalog from "./datalog";
import aws from "./aws";


const appReducers = combineReducers({
  aws,
  datalog,
  routing: routerReducer,
});

export default appReducers;
