import uuidv4 from 'uuid/v4';
import types from '../utils/types';

const initialState = {
  notifications: [],
  loaders: {},
};

const notifications = {
  [types.LOGIN_USER_GITHUB_OAUTH_SUCCESS]: 'Successfully logged in.',
  [types.LOGIN_USER_GITHUB_OAUTH_FAILURE]: 'Failed to login through github. Please try again later',
  [types.UPDATE_USER_PROFILE_SUCCESS]: 'Successfully updated your profile.',
  [types.UPDATE_USER_PROFILE_FAILURE]: 'Failed to update your profile. Please try again later',
  [types.FIND_GYM_REPOS]: 'We are updating your repositories.',
  [types.FIND_GYM_REPOS_SUCCESS]: 'Successfully updated your repositories',
  [types.FIND_GYM_REPOS_FAILURE]: 'Failed to update your repositories. Please try again later',
  [types.LOGOUT_USER_SUCCESS]: 'Successfully logged out.',
  [types.LOGOUT_USER_FAILURE]: 'Failed to log out. Please try again later.',
  [types.CREATE_ENVIRONMENT_SUCCESS]: 'Successfully uploaded environment.',
  [types.CREATE_ENVIRONMENT_FAILURE]: 'Failed to upload environment. Please try again later.',
  [types.EDIT_ENVIRONMENT_SUCCESS]: 'Successfully updated environment.',
  [types.EDIT_ENVIRONMENT_FAILURE]: 'Failed to update environment. Please try again later.',
  [types.DELETE_ENVIRONMENT_SUCCESS]: 'Successfully deleted environment.',
  [types.DELETE_ENVIRONMENT_FAILURE]: 'Failed to delete environment. Please try again later.',
  [types.CREATE_IMAGE_SUCCESS]: 'Successfully uploaded image.',
  [types.CREATE_IMAGE_FAILURE]: 'Failed to upload image. Please try again later.',
  [types.DELETE_IMAGE_SUCCESS]: 'Successfully deleted image.',
  [types.DELETE_IMAGE_FAILURE]: 'Failed to delete image. Please try again later.',
  [types.CREATE_COMMENT_SUCCESS]: 'Successfully posted a reply.',
  [types.CREATE_COMMENT_FAILURE]: 'Failed to post a reply. Please try again later.',
  [types.EDIT_COMMENT_SUCCESS]: 'Successfully updated your reply.',
  [types.EDIT_COMMENT_FAILURE]: 'Failed to update your reply. Please try again later.',
  [types.DELETE_COMMENT_SUCCESS]: 'Successfully deleted your reply.',
  [types.DELETE_COMMENT_FAILURE]: 'Failed to delete your reply. Please try again later.',
  [types.CREATE_MESSAGEBOARD_SUCCESS]: 'Successfully opened a new discussion.',
  [types.CREATE_MESSAGEBOARD_FAILURE]: 'Failed to open a new discussion. Please try again later.',
  [types.EDIT_MESSAGEBOARD_SUCCESS]: 'Successfully updated your discussion.',
  [types.EDIT_MESSAGEBOARD_FAILURE]: 'Failed to update your discussion. Please try again later.',
  [types.DELETE_MESSAGEBOARD_SUCCESS]: 'Successfully deleted your message board.',
  [types.DELETE_MESSAGEBOARD_FAILURE]: 'Failed to delete your message board. Please try again later.',
};

function getNotifications(state, actionType) {
  const message = notifications[actionType];
  const notification = { key: uuidv4(), message };
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
    case types.LOGOUT_USER:
    case types.LOGOUT_USER_SUCCESS:
    case types.LOGOUT_USER_FAILURE:
    case types.UPDATE_USER_PROFILE: {
      return setLoading(state, types.UPDATE_USER_PROFILE, action.type);
    }
    case types.UPDATE_USER_PROFILE_SUCCESS: {
      return removeLoading(state, types.UPDATE_USER_PROFILE, action.type);
    }
    case types.UPDATE_USER_PROFILE_FAILURE: {
      return removeLoading(state, types.UPDATE_USER_PROFILE, action.type);
    }

    case types.FIND_GYM_REPOS: {
      return setLoading(state, types.FIND_GYM_REPOS, action.type);
    }
    case types.FIND_GYM_REPOS_SUCCESS: {
      return removeLoading(state, types.FIND_GYM_REPOS, action.type);
    }
    case types.FIND_GYM_REPOS_FAILURE: {
      return removeLoading(state, types.FIND_GYM_REPOS, action.type);
    }
    case types.CREATE_ENVIRONMENT: {
      return setLoading(state, types.CREATE_ENVIRONMENT, action.type);
    }
    case types.CREATE_ENVIRONMENT_SUCCESS: {
      return removeLoading(state, types.CREATE_ENVIRONMENT, action.type);
    }
    case types.CREATE_ENVIRONMENT_FAILURE: {
      return removeLoading(state, types.CREATE_ENVIRONMENT, action.type);
    }
    case types.EDIT_ENVIRONMENT: {
      return setLoading(state, types.EDIT_ENVIRONMENT, action.type);
    }
    case types.EDIT_ENVIRONMENT_SUCCESS: {
      return removeLoading(state, types.EDIT_ENVIRONMENT, action.type);
    }
    case types.EDIT_ENVIRONMENT_FAILURE: {
      return removeLoading(state, types.EDIT_ENVIRONMENT, action.type);
    }
    case types.DELETE_ENVIRONMENT: {
      return setLoading(state, types.DELETE_ENVIRONMENT, action.type);
    }
    case types.DELETE_ENVIRONMENT_SUCCESS: {
      return removeLoading(state, types.DELETE_ENVIRONMENT, action.type);
    }
    case types.DELETE_ENVIRONMENT_FAILURE: {
      return removeLoading(state, types.DELETE_ENVIRONMENT, action.type);
    }
    case types.CREATE_IMAGE: {
      return setLoading(state, types.CREATE_IMAGE, action.type);
    }
    case types.CREATE_IMAGE_SUCCESS: {
      return removeLoading(state, types.CREATE_IMAGE, action.type);
    }
    case types.CREATE_IMAGE_FAILURE: {
      return removeLoading(state, types.CREATE_IMAGE, action.type);
    }
    case types.DELETE_IMAGE: {
      return setLoading(state, types.DELETE_IMAGE, action.type);
    }
    case types.DELETE_IMAGE_SUCCESS: {
      return removeLoading(state, types.DELETE_IMAGE, action.type);
    }
    case types.DELETE_IMAGE_FAILURE: {
      return removeLoading(state, types.DELETE_IMAGE, action.type);
    }
    case types.CREATE_MESSAGEBOARD: {
      return setLoading(state, types.CREATE_MESSAGEBOARD, action.type);
    }
    case types.CREATE_MESSAGEBOARD_SUCCESS: {
      return removeLoading(state, types.CREATE_MESSAGEBOARD, action.type);
    }
    case types.CREATE_MESSAGEBOARD_FAILURE: {
      return removeLoading(state, types.CREATE_MESSAGEBOARD, action.type);
    }
    case types.EDIT_MESSAGEBOARD: {
      return setLoading(state, types.EDIT_MESSAGEBOARD, action.type);
    }
    case types.EDIT_MESSAGEBOARD_SUCCESS: {
      return removeLoading(state, types.EDIT_MESSAGEBOARD, action.type);
    }
    case types.EDIT_MESSAGEBOARD_FAILURE: {
      return removeLoading(state, types.EDIT_MESSAGEBOARD, action.type);
    }
    case types.DELETE_MESSAGEBOARD: {
      return setLoading(state, types.DELETE_MESSAGEBOARD, action.type);
    }
    case types.DELETE_MESSAGEBOARD_SUCCESS: {
      return removeLoading(state, types.DELETE_MESSAGEBOARD, action.type);
    }
    case types.DELETE_MESSAGEBOARD_FAILURE: {
      return removeLoading(state, types.DELETE_MESSAGEBOARD, action.type);
    }
    case types.GET_COMMENTS_LIST: {
      return setLoading(state, types.GET_COMMENTS_LIST, action.type);
    }
    case types.GET_COMMENTS_LIST_SUCCESS: {
      return removeLoading(state, types.GET_COMMENTS_LIST, action.type);
    }
    case types.GET_COMMENTS_LIST_FAILURE: {
      return removeLoading(state, types.GET_COMMENTS_LIST, action.type);
    }
    case types.CREATE_COMMENT: {
      return setLoading(state, types.CREATE_COMMENT, action.type);
    }
    case types.CREATE_COMMENT_SUCCESS: {
      return removeLoading(state, types.CREATE_COMMENT, action.type);
    }
    case types.CREATE_COMMENT_FAILURE: {
      return removeLoading(state, types.CREATE_COMMENT, action.type);
    }
    case types.EDIT_COMMENT: {
      return setLoading(state, types.EDIT_COMMENT, action.type);
    }
    case types.EDIT_COMMENT_SUCCESS: {
      return removeLoading(state, types.EDIT_COMMENT, action.type);
    }
    case types.EDIT_COMMENT_FAILURE: {
      return removeLoading(state, types.EDIT_COMMENT, action.type);
    }
    case types.DELETE_COMMENT: {
      return setLoading(state, types.DELETE_COMMENT, action.type);
    }
    case types.DELETE_COMMENT_SUCCESS: {
      return removeLoading(state, types.DELETE_COMMENT, action.type);
    }
    case types.DELETE_COMMENT_FAILURE: {
      return removeLoading(state, types.DELETE_COMMENT, action.type);
    }
    default:
      return state;
  }
};

/** selectors */
export function isLoading(state, key) {
  return state.loaders[key] === true;
}
