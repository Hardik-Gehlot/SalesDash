import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import globalReducer from "./state";
import { Provider } from 'react-redux';
import { setupListeners} from '@reduxjs/toolkit/query'
import {api} from './state/api'

const store = configureStore({
  reducer: {
    global: globalReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefault)=> getDefault().concat(api.middleware)
})
setupListeners(store.dispatch);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
document.title="Sales Dash";
const link = document.createElement('link');
link.type = 'image/x-icon';
link.rel = 'shortcut icon';
link.href = 'https://img.icons8.com/cotton/64/analytics.png';
document.head.appendChild(link);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
