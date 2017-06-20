// @flow

import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

import DevTools from "./DevTools";
import HeaderContainer from "../containers/HeaderContainer";
import ChartScreenContainer from "../containers/ChartScreenContainer";

import makePage from "../helpers/makePage";

const page1 = makePage("Page 1");

type Props = { store: Object, history: Object };

const Root = (props: Props) => {
  const { store, history } = props;
  return (
    <Provider store={store}>
      <Router history={history}>
        <div>
          <HeaderContainer />
          <Route exact path="/" component={page1} />
          <Route path="/chart" component={ChartScreenContainer} />
          {false && <DevTools />}
        </div>
      </Router>
    </Provider>
  );
};

export default Root;
