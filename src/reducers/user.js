import types from '../utils/types';

const initialState = {
  accessToken: undefined,
  expiresIn: undefined,
  firstName: undefined,
  id: undefined,
  lastName: undefined,
  refreshToken: undefined,
  scope: undefined,
  tokenType: undefined,
  username: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_USER_GITHUB_OAUTH_SUCCESS:
    case types.REFRESH_AUTH_TOKEN_SUCCESS:
    case types.GET_USER_PROFILE_SUCCESS: {
      return { ...state, ...action.payload };
    }
    case types.LOGOUT_USER_SUCCESS: {
      return { ...initialState };
    }
    default:
      return state;
  }
};
