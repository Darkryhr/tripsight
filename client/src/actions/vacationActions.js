import { types } from './types';
import axios from 'axios';

export const getVacations = () => async (dispatch) => {
  const res = axios.get('/api/v1/vacations');
  dispatch({
    type: types.GET_VACATIONS,
    payload: res.data,
  });
};

// export const createVacation = (newVacation) => async (dispatch) => {
//     const res = axios.post('/api/v1/vacations',newVacation)
// };
