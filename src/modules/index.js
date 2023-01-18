import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import userReducer from "./userReducer";
import cricketReducer from "./crickerReducer";
import favourites from "./favouritesReducer";
import adminReducer from "./adminReducer";
import newsReducer from "./newsReducer";

const createRootReducer = (history) =>
  combineReducers({
    userReducer,
    cricketReducer,
    favourites,
    adminReducer,
    newsReducer,
    router: connectRouter(history),
  });

export default createRootReducer;
