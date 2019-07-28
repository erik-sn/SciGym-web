import types from '../utils/types';

const initialState = {};

function _parseApiError(error) {
  const { data } = error.response;
  return Object.keys(data).reduce((errors, key) => {
    return { ...errors, [key]: data[key][0] };
  }, {});
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_USER_PROFILE:
    case types.UPDATE_USER_PROFILE_SUCCESS: {
      return { ...state, [types.UPDATE_USER_PROFILE]: null };
    }
    case types.UPDATE_USER_PROFILE_FAILURE: {
      return { ...state, [types.UPDATE_USER_PROFILE]: _parseApiError(action.payload) };
    }
    case types.CREATE_ENVIRONMENT:
    case types.CREATE_ENVIRONMENT_SUCCESS: {
      return { ...state, [types.CREATE_ENVIRONMENT]: null };
    }
    case types.CREATE_ENVIRONMENT_FAILURE: {
      return { ...state, [types.CREATE_ENVIRONMENT]: _parseApiError(action.payload) };
    }
    default:
      return state;
  }
};

/** selectors */
export function getErrors(state, key) {
  const error = state[key];
  if (error) {
    return error;
  }
  return false;
}
