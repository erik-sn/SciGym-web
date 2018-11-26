import { combineReducers } from "redux";

import config from "./config";
import user from "./user";
import display from "./display";
import environments from "./environments";
import repositories from "./repositories";

const rootReducer = combineReducers({
  config,
  display,
  user,
  environments,
  repositories
});

export default rootReducer;
