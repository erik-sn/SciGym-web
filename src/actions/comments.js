import types from '../utils/types';

import api from '../utils/api';
import { logError } from '../utils/errors';

export const getComments = params => {
  return dispatch => {
    dispatch({ type: types.GET_COMMENTS_LIST });
    api
      .getComments(params)
      .then(response => {
        dispatch({
          type: types.GET_COMMENTS_LIST_SUCCESS,
          payload: response.data,
        });
      })
      .catch(error => {
        dispatch({ type: types.GET_COMMENTS_LIST_FAILURE });
        logError(error);
      });
  };
};

export const createComment = (...args) => {
  return dispatch => {
    dispatch({ type: types.CREATE_COMMENT });
    api
      .createComment(...args)
      .then(response => {
        dispatch({
          type: types.CREATE_COMMENT_SUCCESS,
          payload: response.data,
        });
        const messageboardId = args[1];
        dispatch(getComments(messageboardId));
      })
      .catch(error => {
        dispatch({ type: types.CREATE_COMMENT_FAILURE, payload: error });
        logError(error);
      });
  };
};

export const editComment = (...args) => {
  return dispatch => {
    dispatch({ type: types.EDIT_COMMENT });
    api
      .editComment(...args)
      .then(response => {
        dispatch({
          type: types.EDIT_COMMENT_SUCCESS,
          payload: response.data,
        });
        const messageboardId = args[2];
        dispatch(getComments(messageboardId));
      })
      .catch(error => {
        dispatch({ type: types.EDIT_COMMENT_FAILURE, payload: error });
        logError(error);
      });
  };
};

export const deleteComment = comment => {
  return dispatch => {
    dispatch({
      type: types.DELETE_COMMENT,
      meta: comment,
    });
    api
      .deleteComment(comment)
      .then(response => {
        dispatch({
          type: types.DELETE_COMMENT_SUCCESS,
          payload: response.data,
        });
        dispatch(getComments(comment.board.id));
      })
      .catch(error => {
        dispatch({ type: types.DELETE_COMMENT_FAILURE });
        logError(error);
      });
  };
};

export const resetCommentsProps = () => {
  return dispatch => {
    dispatch({ type: types.RESET_COMMENTS_PROPS });
  };
};

export const resetCommentsErrors = () => {
  return dispatch => {
    dispatch({ type: types.RESET_COMMENTS_ERRORS });
  };
};

export const resetComments = () => {
  return dispatch => {
    dispatch({ type: types.RESET_COMMENTS })
  }
}
