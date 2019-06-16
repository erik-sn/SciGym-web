import types from '../utils/types';

const initialState = {
  userImages: [],
  imageConfig: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_USER_IMAGES_LIST_SUCCESS: {
      return { ...state, userImages: action.payload };
    }
    case types.DELETE_IMAGE: {
      const imageId = action.meta.id;
      return {
        ...state,
        userImages: state.userImages.filter(image => image.id !== imageId),
      };
    }
    case types.GET_IMAGE_CONFIG_LIST_SUCCESS: {
      return { ...state, imageConfig: action.payload };
    }
    default:
      return state;
  }
};
