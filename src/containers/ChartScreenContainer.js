// @flow

import { connect } from "react-redux";
import type { Dispatch } from "react-redux";
import { bindActionCreators } from "redux";

import type { State } from "../types";
import type { Action as DatalogAction } from "../types/datalog";
import * as datalogActions from "../actions/index";

import ChartScreenComponent from "../components/ChartScreenComponent";

const stateToProps = (state: State) => {
  const { rows } = state.datalog;
  return {
    rows,
  };
};

const dispatchToProps = (dispatch: Dispatch<DatalogAction>) => {
  const boundDatalogActions = bindActionCreators(datalogActions, dispatch);
  return {
    fetchData: boundDatalogActions.fetchDatalogData,
  };
};

export default connect(stateToProps, dispatchToProps)(ChartScreenComponent);

