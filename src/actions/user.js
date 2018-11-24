import types from "../utils/types";

import api from "../utils/api";
import { logError } from "../utils/errors";

export const loginUserWithGithub = (code, state) => {
  return dispatch => {
    dispatch({ type: types.LOGIN_USER_GITHUB_OAUTH, payload: state });
    api
      .login(code)
      .then(response => {
        dispatch({
          type: types.LOGIN_USER_GITHUB_OAUTH_SUCCESS,
          payload: response.data
        });
      })
      .catch(error => {
        dispatch({ type: types.LOGIN_USER_GITHUB_OAUTH_FAILURE });
        logError(error);
      });
  };
};
