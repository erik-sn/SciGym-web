import types from '../utils/types';

const initialState = {
  userImages: [],
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
        images: state.userImages.filter(image => image.id !== imageId),
      };
    }
    default:
      return state;
  }
};
