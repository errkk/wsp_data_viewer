// @flow
import { CALL_HISTORY_METHOD } from "react-router-redux";

import {
  RECEIVE_DATALOG_DATA,
  REQUEST_DATALOG_DATA,
} from "../actions/actionTypes";

import type {
  Action,
  DataRows,
} from "../types/datalog";

type State = {
  rows: DataRows,
  loading: boolean,
};

const defaultState: State = {
  rows: [],
  loading: false,
};

export default (state: State = defaultState, action: Action) => {
  switch (action.type) {
  case CALL_HISTORY_METHOD:
    return state;
  case RECEIVE_DATALOG_DATA:
    return {
      ...state,
      loading: false,
      rows: action.data.map(i => {
        const { t1, t2, t4, timestamp } = i;
        return {
          datetime: new Date(timestamp),
          timestamp,
          poolTemp: t1,
          panelTemp: t2,
          airTemp: t4,
        };
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
