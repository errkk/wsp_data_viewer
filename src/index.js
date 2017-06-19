// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';

import registerServiceWorker from './registerServiceWorker';
import Root from './containers/Root';
import configureStore from './store/configureStore';

import './sass/main.css';

const history = createHistory();
const store = configureStore(history);

ReactDOM.render(
  <Root store={store} history={history} />,
  document.getElementById('root')
);
registerServiceWorker();
