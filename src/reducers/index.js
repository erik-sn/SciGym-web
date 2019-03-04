import { combineReducers } from 'redux';

import config from './config';
import user from './user';
import display from './display';
import environments from './environments';
import errors from './errors';
import repositories from './repositories';
import topics from './topics';

const rootReducer = combineReducers({
  config,
  display,
  user,
  environments,
  errors,
  repositories,
  topics,
});

export default rootReducer;
