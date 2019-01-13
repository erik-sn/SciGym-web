import types from "../utils/types";

const initialState = {
  environments: [],
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
    case types.DELETE_ENVIRONMENT: {
      const envId = action.meta.id;
      return {
        ...state,
        environments: state.environments.filter(env => env.id !== envId),
      };
    }
    default:
      return state;
  }
};
