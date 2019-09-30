import { combineReducers } from 'redux';

import config from './config';
import user from './user';
import display from './display';
import environments from './environments';
import errors from './errors';
import repositories from './repositories';
import topics from './topics';
import images from './images';
import contributors from './contributors';
import projectauthors from './projectauthors';
import messageboards from './messageboards';
import comments from './comments';

const rootReducer = combineReducers({
  config,
  display,
  user,
  environments,
  errors,
  repositories,
  contributors,
  projectauthors,
  topics,
  images,
  messageboards,
  comments,
});

export default rootReducer;
