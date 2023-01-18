// import thunk from "redux-thunk";
// import { createBrowserHistory } from "history";
// import { routerMiddleware } from "connected-react-router";
// import { applyMiddleware, compose, createStore } from "redux";
// import logger from "redux-logger";

// import createRootReducer from "../modules";

// const history = createBrowserHistory();

// // eslint-disable-next-line no-unused-vars
// function configureStore(preloadedState) {
//   const enhancers = [];

//   const node_env =
//     (window._env_ && window._env_.NODE_ENV) || process.env.NODE_ENV;
//   if (node_env === "development") {
//     enhancers.push(applyMiddleware(logger));
//   }

//   const middleware = [thunk, routerMiddleware(history)];

//   const composedEnhancers = compose(
//     applyMiddleware(...middleware),
//     ...enhancers
//   );
//   return createStore(createRootReducer(history), composedEnhancers);
// }

// const StoreService = {
//   history,
//   configureStore,
// };

// export default StoreService;

import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';
import { routerMiddleware } from "connected-react-router";
import { applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import { createBrowserHistory } from "history";
import logger from "redux-logger";
import createRootReducer from "../modules";

const history = createBrowserHistory();
const persistConfig = {
  key: 'root',
  storage,
};

const enhancers = [];
const node_env = (window._env_ && window._env_.NODE_ENV) || process.env.NODE_ENV;

if (node_env === "development") {
  enhancers.push(applyMiddleware(logger));
}

// const middleware = [thunk, routerMiddleware(history)];
// const composedEnhancers = compose(
//   applyMiddleware(...middleware),
//   ...enhancers
// );

const persistedReducer = persistReducer(persistConfig, createRootReducer(history))

export const store = configureStore({
  middleware: [thunk, routerMiddleware(history)],
  reducer: persistedReducer,
  // enhancers: composedEnhancers,
  devTools: process.env.NODE_ENV !== 'production'
})


export const persistor = persistStore(store);

