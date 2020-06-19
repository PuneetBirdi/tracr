import {
  GET_SERVERS,
  ADD_SERVER,
  DELETE_SERVER,
  SERVER_ERROR,
  SET_LOADING,
} from '../actions/types';

const initialState = {
  servers: null,
  errors: null,
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SERVERS:
      return {
        ...state,
        servers: action.payload,
        loading: false,
      };
    case ADD_SERVER:
      return {
        ...state,
        servers: [...state.servers.servers, action.payload],
        loading: false,
      };
    case DELETE_SERVER:
      return {
        ...state,
        techs: state.servers.filter((server) => server.id !== action.payload),
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
