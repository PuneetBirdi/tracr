import {
  SET_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from '../actions/types.js';

const initialState = {
  isAuthenticated: false,
  user: null,
  error: null,
  token: localStorage.getItem('token'),
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
      };
    case LOGOUT:
    case AUTH_ERROR:
    case LOGIN_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        loading: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
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
