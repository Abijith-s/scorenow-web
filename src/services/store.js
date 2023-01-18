import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';
import { routerMiddleware } from "connected-react-router";
import { applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
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

const middleware = [thunk, routerMiddleware(history)];
const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
);

const persistedReducer = persistReducer(persistConfig, createRootReducer(history))

const store = configureStore({
    reducer: persistedReducer,
    enhancers: composedEnhancers,
    devTools: process.env.NODE_ENV !== 'production'
})


const StoreService = {
    store,
    history,
    persistedReducer
};

export default StoreService;

