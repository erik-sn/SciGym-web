import types from '../utils/types';

const initialState = {
  comments: [],
  uploadSuccess: undefined,
  deleteSuccess: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_COMMENTS_LIST_SUCCESS: {
      return {
        ...state,
        comments: action.payload,
      };
    }
    case types.DELETE_COMMENT_SUCCESS: {
      return {
        ...state,
        deleteSuccess: true,
      };
    }
    case types.DELETE_COMMENT_FAILURE: {
      return {
        ...state,
        deleteSuccess: false,
      };
    }
    case types.CREATE_COMMENT_SUCCESS: {
      return {
        ...state,
        uploadSuccess: true,
      };
    }
    case types.CREATE_COMMENT_FAILURE: {
      return {
        ...state,
        uploadSuccess: false,
      };
    }
    case types.EDIT_COMMENT_SUCCESS: {
      return {
        ...state,
        uploadSuccess: true,
      };
    }
    case types.EDIT_COMMENT_FAILURE: {
      return {
        ...state,
        uploadSuccess: false,
      };
    }
    case types.RESET_COMMENTS_PROPS: {
      return {
        ...state,
        uploadSuccess: undefined,
        deleteSuccess: undefined,
      };
    }
    case types.COUNT_COMMENTS_SUCCESS: {
      return {
        ...state,
        num_comments: action.payload
      }
    }
    case types.RESET_COMMENTS: {
      return {
        ...state,
        comments: [],
      }
    }
    default:
      return state;
  }
};