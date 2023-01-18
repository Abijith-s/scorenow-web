import React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App';
import { Provider } from 'react-redux';
import { store, persistor } from './services/storeServices';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import "./style.css"

createRoot(document.querySelector("#root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);


