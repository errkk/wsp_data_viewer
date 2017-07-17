// @flow

import React from "react";
import DevTools from "./DevTools";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

import HeaderContainer from "../containers/HeaderContainer";
import ChartScreenTempContainer from "../containers/ChartScreenTempContainer";
import ChartScreenPhContainer from "../containers/ChartScreenPhContainer";
import ChartScreenChlorineContainer from "../containers/ChartScreenChlorineContainer";
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
          <Route path="/temperature" component={ChartScreenTempContainer} />
          <Route path="/chlorine" component={ChartScreenChlorineContainer} />
          <Route path="/ph" component={ChartScreenPhContainer} />
          {false && <DevTools />}
        </div>
      </Router>
    </Provider>
  );
};

export default Root;
