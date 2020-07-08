import {
  GET_SERVERS,
  ADD_SERVER,
  REMOVE_SERVER,
  SERVER_ERROR,
  SET_LOADING,
  SET_CURRENT_SERVER,
  UPDATE_SERVER,
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

export const addServer = (newServer) => async (dispatch) => {
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
    console.log(res);
  } catch (err) {
    dispatch({
      type: SERVER_ERROR,
      payload: err,
    });
  }
};

export const updateServer = (updatedServer) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    setLoading();
    const res = axios.put(
      `/api/servers/${updatedServer.id}`,
      updatedServer,
      config
    );
    dispatch({
      type: UPDATE_SERVER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SERVER_ERROR,
      payload: err,
    });
  }
};

export const deactivateServer = (server) => async (dispatch) => {
  updateServer(server);
  dispatch({ type: REMOVE_SERVER, payload: server._id });
};

export const setCurrentServer = (server) => async (dispatch) => {
  dispatch({ type: SET_CURRENT_SERVER, payload: server });
};
//Delete a server
export const deleteServer = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/servers/${id}`);
    dispatch({
      type: REMOVE_SERVER,
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
