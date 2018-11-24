import types from "../utils/types";

const initialState = {
  environments: undefined,
  searchedEnvironments: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ENVIRONMENTS_LIST_SUCCESS: {
      return {
        ...state,
        environments: action.payload.results
      };
    }
    default:
      return state;
  }
};
