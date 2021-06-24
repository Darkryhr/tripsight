import { types } from '../actions/types';

const vacationReducer = (state = [], action) => {
  switch (action.type) {
    case types.GET_VACATIONS:
      return action.payload || false;
    case types.ADD_VACATION:
      return [action.payload, ...state];
    case types.DELETE_VACATION:
      return [...state.filter(({ id }) => id !== action.payload)];
    case types.UPDATE_VACATION:
      return state.map((vacation) => {
        if (vacation.id === action.payload.id) {
          return {
            ...vacation,
            ...action.payload,
          };
        } else {
          return vacation;
        }
      });
    default:
      return state;
  }
};

export default vacationReducer;
