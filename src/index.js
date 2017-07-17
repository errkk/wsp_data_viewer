// @flow

import React from "react";
import ReactDOM from "react-dom";
import createHistory from "history/createBrowserHistory";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin from "react-tap-event-plugin";

import Root from "./containers/Root";
import configureStore from "./store/configureStore";

import "./sass/main.css";

const history = createHistory();
const store = configureStore(history);

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

export const App = () => (
  <MuiThemeProvider>
    <Root store={store} history={history} />
  </MuiThemeProvider>
);


ReactDOM.render(
  <App />,
  document.getElementById("root")
);
