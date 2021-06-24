import { types } from '../actions/types';

const initialState = {
  message: '',
  statusCode: null,
};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_ERROR:
      return {
        message: action.payload.message,
        status: action.payload.statusCode,
      };
    case types.CLEAR_ERRORS:
      return {
        message: '',
        statusCode: null,
      };
    default:
      return state;
  }
};

export default errorReducer;
