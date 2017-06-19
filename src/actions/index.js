// @flow

import type { Dispatch } from "react-redux";
import type {
  DataRows,
  ReceiveDatalogData,
  RequestDatalogData,
} from "../types/datalog";

import {
  REQUEST_DATALOG_DATA,
  RECEIVE_DATALOG_DATA,
} from "./actionTypes";

const ENDPOINTS = {
  DATALOG: "dev/data",
};

export function requestDatalogData (): RequestDatalogData {
  return {
    type: REQUEST_DATALOG_DATA,
  };
}

export function receiveDatalogData (data: DataRows): ReceiveDatalogData {
  return {
    type: RECEIVE_DATALOG_DATA,
    data,
  };
}

export function fetchDatalogData () {
  return (dispatch: Dispatch) => {
    dispatch(requestDatalogData());
    return fetch(ENDPOINTS.DATALOG)
      .then(res => res.json())
      .then(json => dispatch(receiveDatalogData(json)));
  };
}
