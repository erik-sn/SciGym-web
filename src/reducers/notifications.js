import types from '../utils/types';

const initialState = {
  list: [],
};

const notificationText = {};

function setNotification(state, key) {
  const text = notificationText[key];
  if (text) {
    return {
      ...state,
      list: state.list.concat(text),
    };
  }
  return state;
}

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

    case types.UPDATE_USER_PROFILE: {
      return setLoading(state, types.UPDATE_USER_PROFILE);
    }
    case types.UPDATE_USER_PROFILE_SUCCESS:
    case types.UPDATE_USER_PROFILE_FAILURE: {
      return removeLoading(state, types.UPDATE_USER_PROFILE);
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
  return state[key] === true;
}
