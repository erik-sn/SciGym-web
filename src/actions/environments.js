import types from '../utils/types';

import api from '../utils/api';
import { logError } from '../utils/errors';

export const getEnvironments = params => {
  return dispatch => {
    dispatch({ type: types.GET_ENVIRONMENTS_LIST });
    api
      .environments(params)
      .then(response => {
        dispatch({
          type: types.GET_ENVIRONMENTS_LIST_SUCCESS,
          payload: response.data,
        });
      })
      .catch(error => {
        dispatch({ type: types.GET_ENVIRONMENTS_LIST_FAILURE });
        logError(error);
      });
  };
};

export const createEnvironment = (...args) => {
  return dispatch => {
    dispatch({ type: types.CREATE_ENVIRONMENT });
    api
      .createEnvironment(...args)
      .then(response => {
        dispatch({
          type: types.CREATE_ENVIRONMENT_SUCCESS,
          payload: response.data,
        });
      })
      .catch(error => {
        dispatch({ type: types.CREATE_ENVIRONMENT_FAILURE });
        logError(error);
      });
  };
};

export const deleteEnvironment = environment => {
  return dispatch => {
    dispatch({
      type: types.DELETE_ENVIRONMENT,
      meta: environment,
    });
    api
      .deleteEnvironment(environment)
      .then(response => {
        dispatch({
          type: types.DELETE_ENVIRONMENT_SUCCESS,
          payload: response.data,
        });
      })
      .catch(error => {
        dispatch({ type: types.DELETE_ENVIRONMENT_FAILURE });
        logError(error);
      });
  };
};

export const searchEnvironments = searchPhrases => {
  const searchPhrasesSplit = searchPhrases.replace(/[ ,]+/g, ',');
  return dispatch => {
    dispatch({
      type: types.SEARCH_ENVIRONMENTS,
      payload: searchPhrases,
    });
    api
      .searchEnvironments(searchPhrasesSplit)
      .then(response => {
        dispatch({
          type: types.SEARCH_ENVIRONMENTS_SUCCESS,
          payload: response.data,
        });
      })
      .catch(error => {
        dispatch({ type: types.SEARCH_ENVIRONMENTS_FAILURE });
        logError(error);
      });
  };
};

export const searchEnvironmentsByTopic = searchTopic => {
  return dispatch => {
    dispatch({
      type: types.SEARCH_ENVIRONMENTS,
      payload: searchTopic,
    });
    api
      .searchEnvironmentsByTopic(searchTopic)
      .then(response => {
        dispatch({
          type: types.SEARCH_ENVIRONMENTS_SUCCESS,
          payload: response.data,
        });
      })
      .catch(error => {
        dispatch({ type: types.SEARCH_ENVIRONMENTS_FAILURE });
        logError(error);
      });
  };
};

export const resetSearchedEnvironments = () => {
  return dispatch => {
    dispatch({ type: types.SEARCH_ENVIRONMENTS_RESET });
  };
};
