// @flow

import {
  RECEIVE_DATALOG_DATA,
} from "../actions/actionTypes";

import type {
  Action,
} from "../types/datalog";

const defaultState = {
  rows: [],
};

type State = {
  rows: DataRows,
};


export default (state: State = defaultState, action: Action) => {
  switch (action.type) {
  case RECEIVE_DATALOG_DATA:
    return {
      ...state,
      rows: action.data.data,
    };
  default:
    return state;
  }
};
