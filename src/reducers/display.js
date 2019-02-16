import types from '../utils/types';

const initialState = {
  notifications: [],
  loaders: {},
};

const notifications = {
  [types.LOGIN_USER_GITHUB_OAUTH_SUCCESS]: 'Successfully logged in.',
  [types.LOGIN_USER_GITHUB_OAUTH_FAILURE]: 'Failed to login through github. Please try again later',
};

function getNotifications(state, actionType) {
  const message = notifications[actionType];
  const notification = { key: actionType, message };
  return message ? state.notifications.concat([notification]) : state.notifications;
}

const setLoading = (state, key, actionType) => ({
  ...state,
  loaders: {
    ...state.loaders,
    [key]: true,
  },
  notifications: getNotifications(state, actionType),
});

const removeLoading = (state, key, actionType) => ({
  loaders: {
    ...state.loaders,
    [key]: false,
  },
  notifications: getNotifications(state, actionType),
});

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_USER_GITHUB_OAUTH:
    case types.REFRESH_AUTH_TOKEN:
    case types.GET_USER_PROFILE: {
      return setLoading(state, types.LOGIN_USER_GITHUB_OAUTH, action.type);
    }

    case types.LOGIN_USER_GITHUB_OAUTH_SUCCESS:
    case types.LOGIN_USER_GITHUB_OAUTH_FAILURE:
    case types.REFRESH_AUTH_TOKEN_SUCCESS:
    case types.REFRESH_AUTH_TOKEN_FAILURE:
    case types.GET_USER_PROFILE_SUCCESS:
    case types.GET_USER_PROFILE_FAILURE: {
      return removeLoading(state, types.LOGIN_USER_GITHUB_OAUTH, action.type);
    }

    case types.UPDATE_USER_PROFILE: {
      return setLoading(state, types.UPDATE_USER_PROFILE, action.type);
    }
    case types.UPDATE_USER_PROFILE_SUCCESS:
    case types.UPDATE_USER_PROFILE_FAILURE: {
      return removeLoading(state, types.UPDATE_USER_PROFILE, action.type);
    }

    case types.FIND_GYM_REPOS: {
      return setLoading(state, types.FIND_GYM_REPOS, action.type);
    }
    case types.FIND_GYM_REPOS_SUCCESS:
    case types.FIND_GYM_REPOS_FAILURE: {
      return removeLoading(state, types.FIND_GYM_REPOS, action.type);
    }
    default:
      return state;
  }
};

/** selectors */
export function isLoading(state, key) {
  return state.loaders[key] === true;
}
