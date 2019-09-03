import types from '../utils/types';

const initialState = {
  userImages: [],
  imageConfig: [],
  deleteSuccess: undefined,
  uploadedImage: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_IMAGE_SUCCESS: {
      return { ...state, uploadedImage: action.payload };
    }
    case types.CREATE_IMAGE_FAILURE: {
      return { ...state, uploadedImage: false };
    }
    case types.DELETE_IMAGE_SUCCESS: {
      return {
        ...state,
        deleteSuccess: true,
      };
    }
    case types.DELETE_IMAGE_FAILURE: {
      return { ...state, deleteSuccess: false };
    }
    case types.GET_USER_IMAGES_LIST_SUCCESS: {
      return { ...state, userImages: action.payload };
    }
    // case types.DELETE_IMAGE: { // weird rerender
    //   const imageId = action.meta.id;
    //   return {
    //     ...state,
    //     userImages: state.userImages.filter(image => image.id !== imageId),
    //   };
    // }
    case types.GET_IMAGE_CONFIG_LIST_SUCCESS: {
      return { ...state, imageConfig: action.payload };
    }
    case types.RESET_IMAGE_PROPS: {
      return { ...state, deleteSuccess: undefined, uploadedImage: undefined };
    }
    default:
      return state;
  }
};
