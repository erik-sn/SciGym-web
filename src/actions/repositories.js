import types from "../utils/types";

import api from "../utils/api";
import { logError } from "../utils/errors";

export const findGymRepos = params => {
  return dispatch => {
    dispatch({ type: types.FIND_GYM_REPOS });
    api
      .findGymRepos()
      .then(response => {
        dispatch({
          type: types.FIND_GYM_REPOS_SUCCESS,
          payload: response.data
        });
      })
      .catch(error => {
        dispatch({ type: types.FIND_GYM_REPOS_FAILURE });
        logError(error);
      });
  };
};

export const getUserRepositories = params => {
  return dispatch => {
    dispatch({ type: types.GET_USER_REPOSITORIES_LIST });
    api
      .repositories(params)
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
};
