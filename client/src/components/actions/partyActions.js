import { SET_LOADING, GET_PARTIES, ADD_PARTY, PARTY_ERROR } from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

// logging in the user, and grabbing the JWT token
export const addParty = (formData) => async (dispatch) => {
  setAuthToken(localStorage.token);
  console.log(formData);
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('/api/parties', formData, config);
    dispatch({
      type: ADD_PARTY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PARTY_ERROR,
      payload: err,
    });
  }
};

export const getParties = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    const res = await axios.get('/api/parties/history');
    dispatch({
      type: GET_PARTIES,
      payload: res,
    });
  } catch (error) {
    dispatch({
      type: PARTY_ERROR,
      payload: error,
    });
  }
};

//Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
