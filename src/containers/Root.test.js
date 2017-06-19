//@ flow

import React from "react";
import ReactDOM from "react-dom";
import createHistory from "history/createBrowserHistory";

import Root from "./Root";
import configureStore from "../store/configureStore";

const history = createHistory();
const store = configureStore(history);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Root store={store} history={history} />, div);
});
