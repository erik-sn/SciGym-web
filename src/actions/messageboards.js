import types from '../utils/types';

import api from '../utils/api';
import { logError } from '../utils/errors';

export const getMessageBoards = params => {
  return dispatch => {
    dispatch({ type: types.GET_MESSAGEBOARDS_LIST });
    api
      .getMessageBoards(params)
      .then(response => {
        dispatch({
          type: types.GET_MESSAGEBOARDS_LIST_SUCCESS,
          payload: response.data,
        });
      })
      .catch(error => {
        dispatch({ type: types.GET_MESSAGEBOARDS_LIST_FAILURE });
        logError(error);
      });
  };
};

export const createMessageBoard = (...args) => {
  return dispatch => {
    dispatch({ type: types.CREATE_MESSAGEBOARD });
    api
      .createMessageBoard(...args)
      .then(response => {
        dispatch({
          type: types.CREATE_MESSAGEBOARD_SUCCESS,
          payload: response.data,
        });
        api.getMessageBoards().then(json => {
          dispatch(getMessageBoards(json.data));
        });
      })
      .catch(error => {
        dispatch({ type: types.CREATE_MESSAGEBOARD_FAILURE, payload: error });
        logError(error);
      });
  };
};

export const editMessageBoard = (...args) => {
  return dispatch => {
    dispatch({ type: types.EDIT_MESSAGEBOARD });
    api
      .editMessageBoard(...args)
      .then(response => {
        dispatch({
          type: types.EDIT_MESSAGEBOARD_SUCCESS,
          payload: response.data,
        });
        api.getMessageBoards().then(json => {
          dispatch(getMessageBoards(json.data));
        });
      })
      .catch(error => {
        dispatch({ type: types.EDIT_MESSAGEBOARD_FAILURE, payload: error });
        logError(error);
      });
  };
};

export const deleteMessageBoard = messageboard => {
  return dispatch => {
    dispatch({
      type: types.DELETE_MESSAGEBOARD,
      meta: messageboard,
    });
    api
      .deleteMessageBoard(messageboard)
      .then(response => {
        dispatch({
          type: types.DELETE_MESSAGEBOARD_SUCCESS,
          payload: response.data,
        });
        api.getMessageBoards().then(json => {
          dispatch(getMessageBoards(json.data));
        });
      })
      .catch(error => {
        dispatch({ type: types.DELETE_MESSAGEBOARD_FAILURE });
        logError(error);
      });
  };
};

export const resetMessageBoardsProps = () => {
  return dispatch => {
    dispatch({ type: types.RESET_MESSAGEBOARDS_PROPS });
  };
};

export const resetMessageBoardsErrors = () => {
  return dispatch => {
    dispatch({ type: types.RESET_MESSAGEBOARDS_ERRORS });
  };
};

export const countComments = () => {
  return dispatch => {
    dispatch({
      type: types.COUNT_COMMENTS,
    });
    api
      .countComments()
      .then(response => {
        dispatch({
          type: types.COUNT_COMMENTS_SUCCESS,
          payload: response.data,
        });
      })
      .catch(error => {
        dispatch({ type: types.COUNT_COMMENTS_FAILURE });
        logError(error);
      });
  }
}
