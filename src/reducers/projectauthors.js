import types from '../utils/types';

const initialState = {
  projectauthors: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PROJECTAUTHORS_LIST_SUCCESS: {
      return {
        ...state,
        projectauthors: action.payload.results,
      };
    }
    default:
      return state;
  }
};
