import types from "../utils/types";

const initialState = {
  loaders: [],
  errors: []
};

const setLoading = (state, key) => ({
  ...state,
  loaders: state.loaders.concat([key])
});

const removeLoading = (state, key) => ({
  ...state,
  loaders: state.loaders.filter(l => l !== key)
});

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_USER_GITHUB_OAUTH:
    case types.REFRESH_AUTH_TOKEN:
    case types.GET_USER_PROFILE: {
      return setLoading(state, types.LOGIN_USER_GITHUB_OAUTH);
    }

    case types.LOGIN_USER_GITHUB_OAUTH_SUCCESS:
    case types.LOGIN_USER_GITHUB_OAUTH_FAILURE:
    case types.REFRESH_AUTH_TOKEN_SUCCESS:
    case types.REFRESH_AUTH_TOKEN_FAILURE:
    case types.GET_USER_PROFILE_SUCCESS:
    case types.GET_USER_PROFILE_FAILURE: {
      return removeLoading(state, types.LOGIN_USER_GITHUB_OAUTH);
    }

    case types.FIND_GYM_REPOS: {
      return setLoading(state, types.FIND_GYM_REPOS);
    }
    case types.FIND_GYM_REPOS_SUCCESS:
    case types.FIND_GYM_REPOS_FAILURE: {
      return removeLoading(state, types.FIND_GYM_REPOS);
    }
    default:
      return state;
  }
};

/** selectors */
export function isLoading(state, key) {
  return Boolean(state.loaders.find(l => l === key));
}
