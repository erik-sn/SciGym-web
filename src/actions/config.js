import types from '../utils/types';

import api from '../utils/api';
import { logError } from '../utils/errors';

export const getApiConfig = () => {
  return dispatch => {
    dispatch({ type: types.GET_API_CONFIG });
    api
      .config()
      .then(response => {
        dispatch({
          type: types.GET_API_CONFIG_SUCCESS,
          payload: response.data,
        });
      })
      .catch(error => {
        dispatch({ type: types.GET_API_CONFIG_FAILURE });
        logError(error);
      });
  };
};

export const getApiStatus = () => {
  return dispatch => {
    dispatch({ type: types.GET_API_STATUS });
    api
      .status()
      .then(response => {
        dispatch({
          type: types.GET_API_STATUS_SUCCESS,
          payload: response.data,
        });
      })
      .catch(error => {
        dispatch({ type: types.GET_API_STATUS_FAILURE });
        logError(error);
      });
  };
};
