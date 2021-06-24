import { types } from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  user: null,
  isAdmin: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.USER_SET:
      return {
        ...state,
        token: localStorage.getItem('token'),
        isAuthenticated: true,
        user: action.payload?.data[0],
        isAdmin: action.payload?.data[0].is_admin,
      };
    case types.LOGIN_SUCCESS:
    case types.REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        user: null,
        isAdmin: action.payload.isAdmin,
      };
    case types.LOGOUT_SUCCESS:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isAdmin: null,
      };
    default:
      return state;
  }
};

export default authReducer;
