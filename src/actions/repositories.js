import types from "../utils/types";

import api from "../utils/api";
import { logError } from "../utils/errors";

export const _getUserRepositories = dispatch => {
  dispatch({ type: types.GET_USER_REPOSITORIES_LIST });
  api
    .myRepositories()
    .then(response => {
      dispatch({
        type: types.GET_USER_REPOSITORIES_LIST_SUCCESS,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch({ type: types.GET_USER_REPOSITORIES_LIST_FAILURE });
      logError(error);
    });
};

export const getUserRepositories = () => {
  return _getUserRepositories;
};

export const findGymRepos = () => {
  return dispatch => {
    dispatch({ type: types.FIND_GYM_REPOS });
    api
      .findGymRepos()
      .then(response => {
        dispatch({
          type: types.FIND_GYM_REPOS_SUCCESS,
          payload: response.data
        });
        _getUserRepositories(dispatch);
      })
      .catch(error => {
        dispatch({ type: types.FIND_GYM_REPOS_FAILURE });
        logError(error);
      });
  };
};

export const getRepositories = () => {
  return dispatch => {
    dispatch({ type: types.GET_REPOSITORIES });
    api
      .repositories()
      .then(response => {
        dispatch({
          type: types.GET_REPOSITORIES_SUCCESS,
          payload: response.data
        });
      })
      .catch(error => {
        dispatch({ type: types.GET_REPOSITORIES_FAILURE });
        logError(error);
      });
  };
};
