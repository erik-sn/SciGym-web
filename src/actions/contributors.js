import types from '../utils/types';

import api from '../utils/api';
import { logError } from '../utils/errors';

export const getContributors = params => {
  return dispatch => {
    dispatch({ type: types.GET_CONTRIBUTORS_LIST });
    api
      .getContributors(params)
      .then(response => {
        dispatch({
          type: types.GET_CONTRIBUTORS_LIST_SUCCESS,
          payload: response.data,
        });
      })
      .catch(error => {
        dispatch({ type: types.GET_CONTRIBUTORS_LIST_FAILURE });
        logError(error);
      });
  };
};
