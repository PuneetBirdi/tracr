import {
  SET_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { loadVenue } from './venueActions';

// logging in the user, and grabbing the JWT token
export const login = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post('api/auth', formData, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    console.log(err);
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response.data.msg,
    });
  }
};

//Use the token to grab the rest of the user information
export const loadUser = () => async (dispatch) => {
  //This line sets the retrived token into a global header (function in a different file) so that it doesn't have to be referenced for every axios call
  if (localStorage.token) {
    setAuthToken(localStorage.token);
    dispatch(loadVenue());
  }

  try {
    const res = await axios.get('api/auth');
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

//Logout
export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};

//Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
