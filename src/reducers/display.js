import types from "../utils/types";

const initialState = {
  loaders: [],
  errors: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_USER_GITHUB_OAUTH: {
      return {
        ...state,
        loaders: state.loaders.concat([types.LOGIN_USER_GITHUB_OAUTH])
      };
    }
    case types.LOGIN_USER_GITHUB_OAUTH_SUCCESS:
    case types.LOGIN_USER_GITHUB_OAUTH_FAILURE: {
      return {
        ...state,
        loaders: state.loaders.filter(l => l !== types.LOGIN_USER_GITHUB_OAUTH)
      };
    }
    default:
      return state;
  }
};
