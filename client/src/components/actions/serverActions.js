import {
  GET_SERVERS,
  ADD_SERVER,
  DELETE_SERVER,
  SERVER_ERROR,
  SET_LOADING,
} from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

//Use the token to grab the rest of the user information
export const loadServers = () => async (dispatch) => {
  //This line sets the retrived token into a global header (function in a different file) so that it doesn't have to be referenced for every axios call
  setAuthToken(localStorage.token);

  try {
    const res = await axios.get('api/servers');
    dispatch({
      type: GET_SERVERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: SERVER_ERROR, payload: err.response.data.msg });
  }
};

export const addServer = (newServer) => (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    setLoading();
    const res = axios.post('api/servers', newServer, config);
    dispatch({
      type: ADD_SERVER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SERVER_ERROR,
      payload: err,
    });
  }
};

//Delete a tech
export const deleteServer = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/servers/${id}`);
    dispatch({
      type: DELETE_SERVER,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: SERVER_ERROR,
      payload: err.response.statusText,
    });
  }
};

//Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
