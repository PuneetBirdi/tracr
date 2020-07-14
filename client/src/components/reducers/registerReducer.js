import {
  SET_LOADING,
  SET_VENUE,
  SET_USER,
  VENUE_CREATE_ERROR,
} from '../actions/types';

const initialState = {
  venue: null,
  user: null,
  loading: false,
  result: null,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_VENUE:
      return {
        ...state,
        venue: action.payload,
        loading: false,
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case VENUE_CREATE_ERROR:
      return {
        ...state,
        error: action.payload,
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
