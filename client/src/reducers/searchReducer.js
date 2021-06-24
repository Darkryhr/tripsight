import { types } from '../actions/types';

const searchReducer = (state = {}, action) => {
  switch (action.type) {
    case types.SEARCH_VACATION:
      return action.payload;
    case types.RESET_SEARCH:
      return {};
    default:
      return state;
  }
};

export default searchReducer;
