//@ flow

import React from "react";
import ReactDOM from "react-dom";
import createHistory from "history/createBrowserHistory";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin from "react-tap-event-plugin";

import Root from "./Root";
import configureStore from "../store/configureStore";

const history = createHistory();
const store = configureStore(history);

injectTapEventPlugin();

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(<MuiThemeProvider><Root store={store} history={history} /></MuiThemeProvider>, div);
});
