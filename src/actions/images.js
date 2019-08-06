import types from '../utils/types';

import api from '../utils/api';
import { logError } from '../utils/errors';

export const _getUserImages = dispatch => {
  dispatch({ type: types.GET_USER_IMAGES_LIST });
  api
    .myImages()
    .then(response => {
      dispatch({
        type: types.GET_USER_IMAGES_LIST_SUCCESS,
        payload: response.data,
      });
    })
    .catch(error => {
      dispatch({ type: types.GET_USER_IMAGES_LIST_FAILURE });
      logError(error);
    });
};

export const getUserImages = () => {
  return _getUserImages;
};

export const _getImageConfig = dispatch => {
  dispatch({ type: types.GET_IMAGE_CONFIG_LIST });
  api
    .imageConfig()
    .then(response => {
      dispatch({
        type: types.GET_IMAGE_CONFIG_LIST_SUCCESS,
        payload: response.data,
      });
    })
    .catch(error => {
      dispatch({ type: types.GET_IMAGE_CONFIG_LIST_FAILURE });
      logError(error);
    });
};

export const getImageConfig = () => {
  return _getImageConfig;
};

export const createImage = (...args) => {
  return dispatch => {
    dispatch({ type: types.CREATE_IMAGE });
    api
      .createImage(...args)
      .then(response => {
        dispatch({
          type: types.CREATE_IMAGE_SUCCESS,
          payload: response.data,
        });
      })
      .catch(error => {
        dispatch({ type: types.CREATE_IMAGE_FAILURE });
        logError(error);
      });
  };
};

export const deleteImage = image => {
  return dispatch => {
    dispatch({
      type: types.DELETE_IMAGE,
      meta: image,
    });
    api
      .deleteImage(image)
      .then(response => {
        dispatch({
          type: types.DELETE_IMAGE_SUCCESS,
          payload: response.data,
        });
        api.myImages().then(json => {
          dispatch(getUserImages(json.data));
        });
      })
      .catch(error => {
        dispatch({ type: types.DELETE_IMAGE_FAILURE });
        logError(error);
      });
  };
};

export const resetImageProps = () => {
  return dispatch => {
    dispatch({ type: types.RESET_IMAGE_PROPS });
  };
};
