import types from '../utils/types';

import api from '../utils/api';
import { logError } from '../utils/errors';

export const getTopics = () => {
  return dispatch => {
    dispatch({ type: types.GET_TOPICS });
    api
      .topics()
      .then(response => {
        dispatch({
          type: types.GET_TOPICS_SUCCESS,
          payload: response.data,
        });
      })
      .catch(error => {
        dispatch({ type: types.GET_TOPICS_FAILURE });
        logError(error);
      });
  };
};
