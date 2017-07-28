// @flow

import { connect } from "react-redux";
import type { Dispatch } from "react-redux";

import type { State } from "../types";
import type { Action as DatalogAction } from "../types/datalog";

import { getLastRow } from "../selectors/datalog-selectors";
import { getLastAwsRow, acceptableChlorine } from "../selectors/aws-selectors";

import DashboardScreenComponent from "../components/DashboardScreenComponent";

const daysSince = (date: Date): number => {
  const now = new Date();
  const difference = now - date;
  return Math.round(difference / 60 / 60 / 1000 / 24);
};

const stateToProps = (state: State) => {
  const { rows } = state.datalog;
  const awsRows = state.aws.rows;
  const awsLoading = state.aws.loading;
  const lastRow = getLastRow(state);
  const lastAwsRow = getLastAwsRow(state);
  return {
    rows,
    awsRows,
    ...lastRow,
    ...lastAwsRow,
    awsLoading,
    daysSince: lastAwsRow ? daysSince(lastAwsRow.datetime) : null,
    datetime: lastAwsRow ? lastAwsRow.datetime : null,
    acceptableChlorine: acceptableChlorine(state),
  };
};


const dispatchToProps = (dispatch: Dispatch<DatalogAction>) => {
  return {
  };
};

export default connect(stateToProps, dispatchToProps)(DashboardScreenComponent);

