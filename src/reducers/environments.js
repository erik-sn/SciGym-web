import types from '../utils/types';

const initialState = {
  environments: [],
  searchedEnvironments: undefined,
  categorizedEnvironments: undefined,
  searchedTopic: undefined,
  uploadSuccess: undefined,
  deleteSuccess: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ENVIRONMENTS_LIST_SUCCESS: {
      return {
        ...state,
        environments: action.payload.results,
      };
    }
    // case types.DELETE_ENVIRONMENT: // environments: state.environments.filter(env => env.id !== envId), causes weird rerender
    case types.DELETE_ENVIRONMENT_SUCCESS: {
      return {
        ...state,
        deleteSuccess: true,
      };
    }
    case types.DELETE_ENVIRONMENT_FAILURE: {
      return {
        ...state,
        deleteSuccess: false,
      };
    }
    case types.CREATE_ENVIRONMENT_SUCCESS: {
      return {
        ...state,
        uploadSuccess: true,
      };
    }
    case types.CREATE_ENVIRONMENT_FAILURE: {
      return {
        ...state,
        uploadSuccess: false,
      };
    }
    case types.EDIT_ENVIRONMENT_SUCCESS: {
      return {
        ...state,
        uploadSuccess: true,
      };
    }
    case types.EDIT_ENVIRONMENT_FAILURE: {
      return {
        ...state,
        uploadSuccess: false,
      };
    }
    case types.RESET_ENVIRONMENTS_PROPS: {
      return {
        ...state,
        uploadSuccess: undefined,
        deleteSuccess: undefined,
      };
    }
    case types.SEARCH_ENVIRONMENTS_SUCCESS: {
      return {
        ...state,
        searchedEnvironments: action.payload,
      };
    }
    case types.SEARCH_ENVIRONMENTS_FAILURE: {
      return {
        ...state,
        searchedEnvironments: [],
      };
    }
    case types.SEARCH_ENVIRONMENTS_RESET: {
      return {
        ...state,
        searchedEnvironments: undefined,
      };
    }
    case types.CATEGORIZE_ENVIRONMENTS_SUCCESS: {
      return {
        ...state,
        categorizedEnvironments: action.environment,
        searchedTopic: action.topic,
      };
    }
    case types.CATEGORIZE_ENVIRONMENTS_FAILURE: {
      return {
        ...state,
        categorizedEnvironments: [],
      };
    }
    case types.CATEGORIZE_ENVIRONMENTS_RESET: {
      return {
        ...state,
        categorizedEnvironments: undefined,
        searchedTopic: undefined,
      };
    }
    default:
      return state;
  }
};
