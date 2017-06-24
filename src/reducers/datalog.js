// @flow

import {
  RECEIVE_DATALOG_DATA,
  REQUEST_DATALOG_DATA,
} from "../actions/actionTypes";

import type {
  Action,
  DataRows,
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
      loading: false,
      rows: action.data.data.map(i => {
        i.timestamp = new Date(i.timestamp);
        return i;
      }),
    };
  case REQUEST_DATALOG_DATA:
    return {
      ...state,
      loading: true,
    };
  default:
    return state;
  }
};
