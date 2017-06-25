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

import type {
  State,
} from "../types";

import { getLastRow } from "../selectors/datalog-selectors";
import { getDataAge } from "../helpers/utils";

const ENDPOINTS = {
  DATALOG: "dev/data",
};

export function requestDatalogData (): RequestDatalogData {
  return {
    type: REQUEST_DATALOG_DATA,
  };
}

export function receiveDatalogData (data: { data: DataRows }): ReceiveDatalogData {
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

export function setupDataRefresher () {
  return (dispatch: Dispatch, state: State) => {
    const timestamp = getLastRow(state);
    if (!timestamp) return;
    const dataAge = getDataAge(timestamp);
    const MAX_AGE = 15 * 60;
    const timeTilRefresh = MAX_AGE - dataAge;
    if (timeTilRefresh > 0) {
      console.log(`Scheduling fetch in ${timeTilRefresh} seconds`);
      setTimeout(() => dispatch(fetchDatalogData));
    }
    return {
    // TODO return something that tells the store there is a timeout set
    };
  };
}
