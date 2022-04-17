import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { App } from './App/App';
import { store } from 'redux/store';
import { ErrorBoundary } from 'components/ErrorBoundry/ErrorBoundry';

import 'styles/variables.scss';
import 'styles/global.scss';
import 'normalize.css';


ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundary
      fallbackRender={({ error }) => (
        <div role="alert">
          <div>Oh no</div>
          <pre>{error.message}</pre>
        </div>
      )}
    >
      <App />
    </ErrorBoundary>
  </Provider>,
  document.getElementById('root'),
);
