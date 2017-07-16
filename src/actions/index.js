// @flow

import type { Dispatch } from "react-redux";
import type {
  DataRows,
  ReceiveDatalogData,
  RequestDatalogData,
  ReceiveAwsData,
  RequestAwsData,
  AwsRows,
} from "../types/datalog";

import {
  REQUEST_DATALOG_DATA,
  RECEIVE_DATALOG_DATA,
  REQUEST_AWS_DATA,
  RECEIVE_AWS_DATA,
} from "./actionTypes";

const ENDPOINTS = {
  DATALOG: "https://wottonpool.co.uk/panel/json/data/1/",
  AWS: "https://zbutev8ga7.execute-api.eu-west-2.amazonaws.com/dev/data",
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

export function requestAwsData (): RequestAwsData {
  return {
    type: REQUEST_AWS_DATA,
  };
}

export function receiveAwsData (data: AwsRows): ReceiveAwsData {
  return {
    type: RECEIVE_AWS_DATA,
    data,
  };
}

export function fetchAwsData () {
  return (dispatch: Dispatch) => {
    dispatch(requestAwsData());
    return fetch(ENDPOINTS.AWS)
      .then(res => res.json())
      .then(json => json.data)
      .then(data => dispatch(receiveAwsData(data)));
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
