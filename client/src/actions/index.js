import axios from 'axios';

import { types } from './types';

export const fetchUser = () => async (dispatch, getState) => {
  const config = tokenConfig(getState);
  const { data } = await axios.get('/api/v1/users/current', config);
  dispatch({ type: types.USER_SET, payload: data });
  // .then((res) => dispatch({ type: FETCH_USER, payload: res }));
};

export const loginUser =
  ({ username, password }) =>
  async (dispatch) => {
    // headers
    const config = {
      headers: {
        'content-type': 'application/json',
      },
    };
    // request body
    const body = JSON.stringify({ username, password });
    const res = await axios.post('/api/v1/users/login', body, config);
    dispatch({ type: types.LOGIN_SUCCESS, payload: res.data });
  };

export const registerUser =
  ({ first_name, last_name, username, password }) =>
  async (dispatch) => {
    // headers
    const config = {
      headers: {
        'content-type': 'application/json',
      },
    };
    // request body
    const body = JSON.stringify({ first_name, last_name, username, password });
    try {
      const res = await axios.post('/api/v1/users/signup', body, config);
      dispatch({ type: types.REGISTER_SUCCESS, payload: res.data });
    } catch (err) {
      sendError(err, dispatch);
    }
  };

export const logoutUser = () => ({ type: types.LOGOUT_SUCCESS });

export const getVacations = () => async (dispatch, getState) => {
  const config = tokenConfig(getState);
  try {
    const res = await axios.get('/api/v1/vacations', config);
    dispatch({
      type: types.GET_VACATIONS,
      payload: res.data.result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const addFollow = (vacation_id) => async (dispatch, getState) => {
  const config = tokenConfig(getState);
  await axios.get(`/api/v1/follow/${vacation_id}`, config);
  dispatch({ type: types.ADD_FOLLOW, payload: vacation_id });
};

export const removeFollow = (vacation_id) => async (dispatch, getState) => {
  const config = tokenConfig(getState);
  await axios.delete(`/api/v1/follow/${vacation_id}`, config);
  dispatch({ type: types.REMOVE_FOLLOW, payload: vacation_id });
};

export const getFollowed = (id) => async (dispatch, getState) => {
  const config = tokenConfig(getState);
  const { data } = await axios.get(`/api/v1/follow`, config);
  dispatch({ type: types.SHOW_FOLLOWED, payload: data.followed });
};

export const updateVacation = (data) => async (dispatch, getState) => {
  const config = tokenConfig(getState);
  const {
    destination,
    description,
    img,
    price,
    followers,
    start_date,
    end_date,
    id,
    followed,
  } = data;
  const body = JSON.stringify({
    destination,
    description,
    img,
    price,
    followers,
    start_date,
    end_date,
    followed,
  });
  const result = await axios.patch(`/api/v1/vacations/${id}`, body, config);
  dispatch({ type: types.UPDATE_VACATION, payload: result.data.result[0] });
};

export const deleteVacation = (vacation_id) => async (dispatch, getState) => {
  const config = tokenConfig(getState);
  await axios.delete(`/api/v1/vacations/${vacation_id}`, config);
  dispatch({ type: types.DELETE_VACATION, payload: vacation_id });
};

export const searchVacation = (query) => {
  return { type: types.SEARCH_VACATION, payload: query };
};

export const resetSearcg = () => {
  return { type: types.RESET_SEARCH };
};

export const allFollows = () => async (dispatch, getState) => {
  const config = tokenConfig(getState);
  const { data } = await axios.get(`/api/v1/follow/all`, config);
  dispatch({ type: types.ALL_FOLLOWS, payload: data });
};

// export const errors = () => {};

export const sendError = (err, dispatch) => {
  console.log(err);
  dispatch({
    type: types.SHOW_ERROR,
    payload: {
      message: err.response.data,
      statusCode: err.response.status,
    },
  });
};

export const addVacation = (data) => async (dispatch, getState) => {
  console.log(data);
  const config = tokenConfig(getState);
  const {
    destination,
    description,
    img,
    price,
    start_date,
    end_date,
    followers,
  } = data;
  const body = JSON.stringify({
    destination,
    description,
    img,
    price,
    start_date,
    end_date,
    followers,
  });
  try {
    const response = await axios.post('/api/v1/vacations', body, config);
    console.log(response);
    dispatch({ type: types.ADD_VACATION, payload: response.data.result });
  } catch (err) {
    console.log(err);
    sendError(err, dispatch);
  }
};

// setup config/headers
export const tokenConfig = (getState) => {
  // GET TOKEN
  const token = getState().auth.token;
  // HEADERS
  const config = {
    headers: {
      'content-type': 'application/json',
    },
  };
  // if token exists add to headers
  if (token) config.headers['authorization'] = `Bearer ${token}`;
  return config;
};
