import { combineReducers } from 'redux';

import config from './config';
import user from './user';
import display from './display';
import environments from './environments';
import errors from './errors';
import repositories from './repositories';

const rootReducer = combineReducers({
  config,
  display,
  user,
  environments,
  errors,
  repositories,
});

export default rootReducer;
