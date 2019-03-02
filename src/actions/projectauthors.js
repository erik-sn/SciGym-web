import types from '../utils/types';

import api from '../utils/api';
import { logError } from '../utils/errors';

export const getProjectAuthors = params => {
  return dispatch => {
    dispatch({ type: types.GET_PROJECTAUTHORS_LIST });
    api
      .getProjectAuthors(params)
      .then(response => {
        dispatch({
          type: types.GET_PROJECTAUTHORS_LIST_SUCCESS,
          payload: response.data,
        });
      })
      .catch(error => {
        dispatch({ type: types.GET_PROJECTAUTHORS_LIST_FAILURE });
        logError(error);
      });
  };
};
