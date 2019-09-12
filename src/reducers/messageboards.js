import types from '../utils/types';

const initialState = {
  messageboards: [],
  uploadSuccess: undefined,
  deleteSuccess: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_MESSAGEBOARDS_LIST_SUCCESS: {
      return {
        ...state,
        messageboards: action.payload.results,
      };
    }
    case types.DELETE_MESSAGEBOARD_SUCCESS: {
      return {
        ...state,
        deleteSuccess: true,
      };
    }
    case types.DELETE_MESSAGEBOARD_FAILURE: {
      return {
        ...state,
        deleteSuccess: false,
      };
    }
    case types.CREATE_MESSAGEBOARD_SUCCESS: {
      return {
        ...state,
        uploadSuccess: true,
      };
    }
    case types.CREATE_MESSAGEBOARD_FAILURE: {
      return {
        ...state,
        uploadSuccess: false,
      };
    }
    case types.EDIT_MESSAGEBOARD_SUCCESS: {
      return {
        ...state,
        uploadSuccess: true,
      };
    }
    case types.EDIT_MESSAGEBOARD_FAILURE: {
      return {
        ...state,
        uploadSuccess: false,
      };
    }
    case types.RESET_MESSAGEBOARD_PROPS: {
      return {
        ...state,
        uploadSuccess: undefined,
        deleteSuccess: undefined,
      };
    }
    default:
      return state;
  }
};
