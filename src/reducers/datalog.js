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

const defaultState = {
  rows: [],
};

type State = {
  rows: DataRows,
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
        const { chlorine, ph, t1, t2, t4, timestamp } = i;
        return {
          timestamp: new Date(timestamp),
          poolTemp: t1,
          panelTemp: t2,
          airTemp: t4,
          chlorine,
          ph,
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
