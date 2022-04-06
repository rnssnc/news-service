import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { App } from './App/App';
import store from './store';
import { ErrorBoundary } from 'components/ErrorBoundry/ErrorBoundry';
import { NewsService, NewsServiceProvider } from 'services/NewsService/';

import 'styles/variables.scss';
import 'styles/global.scss';
import 'normalize.css';

const newsService = new NewsService();

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
      <NewsServiceProvider value={newsService}>
        <Router>
          <App />
        </Router>
      </NewsServiceProvider>
    </ErrorBoundary>
  </Provider>,
  document.getElementById('root'),
);
