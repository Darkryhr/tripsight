import { combineReducers } from 'redux';
import authReducer from './authReducer';
import vacationReducer from './vacationReducer';
import errorReducer from './errorReducer';
import folllowReducer from './followReducer';
import searchReducer from './searchReducer';

export default combineReducers({
  auth: authReducer,
  vacations: vacationReducer,
  error: errorReducer,
  follows: folllowReducer,
  search: searchReducer,
});
