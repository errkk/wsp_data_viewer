// @flow
import {
  RECEIVE_AWS_DATA,
  REQUEST_AWS_DATA,
} from "../actions/actionTypes";

import type {
  Action,
  AwsRows,
} from "../types/aws";

type State = {
  rows: AwsRows,
  loading: boolean,
};

const defaultState: State = {
  rows: [],
  loading: false,
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
          datetime: new Date(timestamp),
          timestamp,
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
