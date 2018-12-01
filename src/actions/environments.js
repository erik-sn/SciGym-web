import types from "../utils/types";

import api from "../utils/api";
import { logError } from "../utils/errors";

export const getEnvironments = params => {
  return dispatch => {
    dispatch({ type: types.GET_ENVIRONMENTS_LIST });
    api
      .environments(params)
      .then(response => {
        dispatch({
          type: types.GET_ENVIRONMENTS_LIST_SUCCESS,
          payload: response.data
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
          payload: response.data
        });
      })
      .catch(error => {
        dispatch({ type: types.CREATE_ENVIRONMENT_FAILURE });
        logError(error);
      });
  };
};
