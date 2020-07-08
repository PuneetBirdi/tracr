import {
  GET_SERVERS,
  ADD_SERVER,
  REMOVE_SERVER,
  SET_LOADING,
  SERVER_ERROR,
  SET_CURRENT_SERVER,
  UPDATE_SERVER,
} from '../actions/types';

const initialState = {
  servers: null,
  errors: null,
  loading: false,
  current: null,
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
    case SET_CURRENT_SERVER:
      return {
        ...state,
        current: action.payload,
      };
    case UPDATE_SERVER:
      return {
        ...state,
        servers: state.servers.map((server) =>
          server._id === action.payload._id ? action.payload : server
        ),
      };
    case REMOVE_SERVER:
      return {
        ...state,
        techs: state.servers.filter((server) => server.id !== action.payload),
        loading: false,
      };
    case SERVER_ERROR:
      return {
        ...state,
        errors: action.payload,
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
