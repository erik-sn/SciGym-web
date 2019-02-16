import uuidv4 from 'uuid/v4';

import types from '../utils/types';

const initialState = {
  loaded: false,
  githubRandomState: uuidv4(),
  githubClientId: undefined,
  githubCallbackUrl: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_API_CONFIG_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        loaded: true,
      };
    }
    default:
      return state;
  }
};
