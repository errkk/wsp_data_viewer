// @flow

import { connect } from "react-redux";

import type { State } from "../types";

import Component from "../components/ChartScreenPhComponent";

const stateToProps = (state: State) => {
  const { rows } = state.aws;
  return {
    rows,
  };
};

export default connect(stateToProps)(Component);
