import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { store } from './store';
import { App } from './App';
import { ErrorDialogs } from './containers';

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <ErrorDialogs />
    </BrowserRouter>
  </Provider>,
);
