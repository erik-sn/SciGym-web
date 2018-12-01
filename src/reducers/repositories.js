import types from "../utils/types";

const initialState = {
  userRepositories: undefined,
  repositories: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_USER_REPOSITORIES_LIST_SUCCESS: {
      return { ...state, userRepositories: action.payload };
    }
    case types.GET_REPOSITORIES_SUCCESS: {
      return { ...state, repositories: action.payload.results };
    }
    default:
      return state;
  }
};
