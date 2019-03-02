import { combineReducers } from 'redux';

import config from './config';
import user from './user';
import display from './display';
import environments from './environments';
import errors from './errors';
import repositories from './repositories';
import contributors from './contributors';
import projectauthors from './projectauthors';

const rootReducer = combineReducers({
  config,
  display,
  user,
  environments,
  errors,
  repositories,
  contributors,
  projectauthors,
});

export default rootReducer;
