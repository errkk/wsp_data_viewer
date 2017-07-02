// @flow

import React from "react";
import DevTools from "./DevTools";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

import HeaderContainer from "../containers/HeaderContainer";
import ChartScreenContainer from "../containers/ChartScreenContainer";
import DashboardScreenContainer from "../containers/DashboardScreenContainer";

type Props = { store: Object, history: Object };

const Root = (props: Props) => {
  const { store, history } = props;
  return (
    <Provider store={store}>
      <Router history={history}>
        <div>
          <HeaderContainer />
          <Route exact path="/" component={DashboardScreenContainer} />
          <Route path="/chart" component={ChartScreenContainer} />
          {false && <DevTools />}
        </div>
      </Router>
    </Provider>
  );
};

export default Root;
