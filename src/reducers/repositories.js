import types from "../utils/types";

const initialState = {
  userRepositories: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_USER_REPOSITORIES_LIST_SUCCESS: {
      return {
        ...state,
        userRepositories: action.payload.results
      };
    }
    default:
      return state;
  }
};
