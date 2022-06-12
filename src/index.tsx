import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './App/App';
import { ErrorBoundary } from 'components/ErrorBoundry/ErrorBoundry';

ReactDOM.render(
    <ErrorBoundary
      fallbackRender={({ error }) => (
        <div role="alert">
          <div>Ошибка:</div>
          <pre>{error.message}</pre>
        </div>
      )}
    >
      <App />
    </ErrorBoundary>,
  document.getElementById('root'),
);
