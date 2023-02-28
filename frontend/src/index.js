import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';

import configureStore from './store';
import { restoreCSRF } from './store/csrf';

const store = configureStore();

const root = ReactDOM.createRoot(document.getElementById('root'));

if (process.env.NODE_ENV !== 'production') {
  restoreCSRF()
}
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
