// @flow
import {
  RECEIVE_AWS_DATA,
  REQUEST_AWS_DATA,
} from "../actions/actionTypes";

import type {
  Action,
  AwsRows,
} from "../types/aws";

const defaultState = {
  rows: [],
};

type State = {
  rows: AwsRows,
};

export default (state: State = defaultState, action: Action) => {
  switch (action.type) {
  case RECEIVE_AWS_DATA:
    return {
      ...state,
      loading: false,
      rows: action.data.map(i => {
        const { chlorine, ph, timestamp } = i;
        return {
          timestamp: new Date(timestamp),
          chlorine,
          ph,
        };
      }),
    };
  case REQUEST_AWS_DATA:
    return {
      ...state,
      loading: true,
    };
  default:
    return state;
  }
};
