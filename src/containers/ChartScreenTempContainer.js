// @flow

import { connect } from "react-redux";

import type { State } from "../types";

import Component from "../components/ChartScreenTempComponent";

const stateToProps = (state: State) => {
  const { rows } = state.datalog;
  return {
    rows,
  };
};

export default connect(stateToProps)(Component);
