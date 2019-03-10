import types from '../utils/types';

const initialState = {
  userImages: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_USER_IMAGES_LIST_SUCCESS: {
      return { ...state, userImages: action.payload };
    }
    default:
      return state;
  }
};
