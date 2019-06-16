import types from '../utils/types';

const initialState = {
  topics: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_TOPICS_SUCCESS: {
      return {
        ...state,
        topics: action.payload.results,
      };
    }
    default:
      return state;
  }
};
