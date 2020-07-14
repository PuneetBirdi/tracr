import {
  SET_LOADING,
  SET_VENUE,
  SET_USER,
  LOGIN_FAIL,
  VENUE_CREATE_ERROR,
  USER_REGISTER_ERROR,
} from './types';
import axios from 'axios';
import store from '../../store';
import { login } from './venueActions';

export const setNewVenue = (venue) => async (dispatch) => {
  dispatch({
    type: SET_VENUE,
    payload: venue,
  });
};

export const setNewUser = (user) => async (dispatch) => {
  dispatch({
    type: SET_USER,
    payload: user,
  });
  dispatch(finishRegistration());
};

export const finishRegistration = () => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const state = store.getState();
  try {
    const venueResult = await axios.post(
      '/api/venues/',
      state.register.venue,
      config
    );
    const newUser = { ...state.register.user, venue: venueResult.data._id };
    console.log(newUser);
    try {
      const userResult = await axios.post('/api/users', newUser, config);
    } catch (err) {}
  } catch (err) {
    dispatch({
      type: VENUE_CREATE_ERROR,
      payload: err,
    });
  }
};

//Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
