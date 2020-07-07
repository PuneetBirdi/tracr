import { SET_LOADING, GET_VENUE, VENUE_ERROR } from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

//Use the token to grab the rest of the venue information
export const loadVenue = () => async (dispatch) => {
  //This line sets the retrived token into a global header (function in a different file) so that it doesn't have to be referenced for every axios call
  setAuthToken(localStorage.token);
  try {
    const res = await axios.get('api/venues');
    dispatch({
      type: GET_VENUE,
      payload: res.data[0],
    });
  } catch (err) {
    dispatch({ type: VENUE_ERROR, payload: err.response.data.msg });
  }
};

//Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
