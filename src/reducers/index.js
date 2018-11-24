import { combineReducers } from "redux";

import config from "./config";
import user from "./user";
import display from "./display";
import environments from "./environments";

const rootReducer = combineReducers({ config, display, user, environments });

export default rootReducer;
