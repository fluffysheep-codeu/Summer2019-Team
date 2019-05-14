import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

import 'index.css';
import Root from 'components/container/Root.js';
import rootReducer from 'reducers/root.js';
import * as serviceWorker from 'serviceWorker.js';

/**
 * Redux storage of all client-side data.
 * Use the Redux Dev Tools chrome extension to see your storage.
 * https://github.com/zalmoxisus/redux-devtools-extension
 */
const store = createStore(rootReducer, devToolsEnhancer());

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
