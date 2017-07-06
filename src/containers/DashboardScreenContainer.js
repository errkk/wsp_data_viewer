// @flow

import { connect } from "react-redux";
import type { Dispatch } from "react-redux";

import type { State } from "../types";
import type { Action as DatalogAction } from "../types/datalog";

import { getLastRow, acceptableChlorine } from "../selectors/datalog-selectors";

import DashboardScreenComponent from "../components/DashboardScreenComponent";

const daysSince = (date: Date): number => {
  const now = new Date();
  const difference = now - date;
  return Math.round(difference / 60 / 60 / 1000 / 24);
};

const stateToProps = (state: State) => {
  const { rows } = state.datalog;
  const lastRow = getLastRow(state);
  return {
    rows,
    ...lastRow,
    daysSince: lastRow ? daysSince(lastRow.timestamp) : null,
    acceptableChlorine: acceptableChlorine(state),
  };
};


const dispatchToProps = (dispatch: Dispatch<DatalogAction>) => {
  return {
  };
};

export default connect(stateToProps, dispatchToProps)(DashboardScreenComponent);

