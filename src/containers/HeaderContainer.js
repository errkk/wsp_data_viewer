// @flow

import { connect } from "react-redux";
import type { Dispatch } from "react-redux";
import { bindActionCreators } from "redux";

import HeaderComponent from "../components/HeaderComponent";

import type { State } from "../types";
import type { Action as DatalogAction } from "../types/datalog";
import * as datalogActions from "../actions/index";

const stateToProps = (state: State) => {
  return { title: "Data" };
};

const dispatchToProps = (dispatch: Dispatch<DatalogAction>) => {
  const boundDatalogActions = bindActionCreators(datalogActions, dispatch);
  return {
    fetchData: boundDatalogActions.fetchDatalogData,
  };
};

export default connect(stateToProps, dispatchToProps)(HeaderComponent);
