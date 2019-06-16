import types from '../utils/types';

const initialState = {
  contributors: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CONTRIBUTORS_LIST_SUCCESS: {
      return {
        ...state,
        contributors: action.payload.results,
      };
    }
    default:
      return state;
  }
};
