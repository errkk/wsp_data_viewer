// @flow

import { connect } from "react-redux";
import type { Dispatch } from "react-redux";
import { bindActionCreators } from "redux";

import ChartComponent from "../components/ChartComponent";

//import type { State } from "../types";
//import type { Action as PlaylistAction } from '../types/playlist';
//import * as PlaylistActions from '../actions/index';

const stateToProps = (state: State) => {
  return { rows: state.datalog.rows };
};

const dispatchToProps = (dispatch: Dispatch<DatalogAction>) => {
  return {
    //playlistActions: bindActionCreators(PlaylistActions, dispatch),
  };
};

export default connect(stateToProps, dispatchToProps)(ChartComponent);

