import axios from "axios";

import types from "../utils/types";
import constants from "../utils/constants";

/**
 * store the user authentication token in the API
 * and set it as the default Authoriation header
 * in axios
 * @param {string} token
 */
export function setAuthorizationHeader(accessToken, refreshToken) {
  localStorage.setItem(constants.REFRESH_TOKEN, refreshToken);
  axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
}

/**
 * Remove the token from localStorage and the axios
 * default header
 */
export function clearAuthorizationHeader() {
  localStorage.removeItem(constants.REFRESH_TOKEN);
  axios.defaults.headers.common = {};
}

/**
 * Middleware listening on any actions pertaining to authentication
 * or interaction with the API
 */
const AuthMiddleware = () => next => action => {
  // coming from the async action hitting the user endpoint
  if (
    action.type === types.LOGIN_USER_GITHUB_OAUTH_SUCCESS ||
    action.type === types.REFRESH_AUTH_TOKEN_SUCCESS
  ) {
    const { accessToken, refreshToken } = action.payload;
    setAuthorizationHeader(accessToken, refreshToken);
  }
  if (action.type === types.LOGOUT_USER_SUCCESS) {
    clearAuthorizationHeader();
  }
  next(action);
};

export default AuthMiddleware;
