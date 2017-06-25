// @flow

import React from "react";
import DevTools from "./DevTools";
import { Provider, connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { bindActionCreators } from "redux";

import type { Dispatch } from "react-redux";
import type { State } from "../types";
import type { Action as DatalogAction } from "../types/datalog";

import { getLastRow } from "../selectors/datalog-selectors";
import * as datalogActions from "../actions/index";

import HeaderContainer from "../containers/HeaderContainer";
import ChartScreenContainer from "../containers/ChartScreenContainer";
import DashboardScreenContainer from "../containers/DashboardScreenContainer";

type Props = { store: Object, history: Object };
type AppComponentProps = {
  setupDataRefresher: Function,
}

class AppComponent extends React.PureComponent {
  props: AppComponentProps;

  componentDidMount () {
    const { setupDataRefresher } = this.props;
  }

  render () {
    return (
      <div>
        <HeaderContainer />
        <Route exact path="/" component={DashboardScreenContainer} />
        <Route path="/chart" component={ChartScreenContainer} />
        {false && <DevTools />}
      </div>
    );
  }
}

const stateToProps = (state: State) => {
  const lastRow = getLastRow(state);
  return {
    lastUpdate: lastRow ? lastRow.timestamp : null,
  };
};


const dispatchToProps = (dispatch: Dispatch<DatalogAction>) => {
  const boundDatalogActions = bindActionCreators(datalogActions, dispatch);
  return {
    setupDataRefresher: boundDatalogActions.setupDataRefresher,
  };
};

const AppContainer = connect(stateToProps, dispatchToProps)(AppComponent);

const Root = (props: Props) => {
  const { store, history } = props;
  return (
    <Provider store={store}>
      <Router history={history}>
        <AppContainer />
      </Router>
    </Provider>
  );
};

export default Root;
