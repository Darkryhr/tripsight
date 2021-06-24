import { types } from '../actions/types';

const followReducer = (state = [], action) => {
  switch (action.type) {
    case types.ADD_FOLLOW:
      return [...state, action.payload];
    case types.SHOW_FOLLOWED:
      return action.payload;
    case types.REMOVE_FOLLOW:
      // [...state.filter(({ id }) => id !== action.payload)];
      // const newState = state.splice(state.indexOf(action.payload));
      return [...state.filter((id) => id !== action.payload)];
    case types.ALL_FOLLOWS:
      console.log(action.payload.follows);
      return [...state, action.payload.follows];
    default:
      return [...state];
  }
};

export default followReducer;
