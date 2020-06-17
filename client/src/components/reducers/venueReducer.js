import { SET_LOADING, GET_VENUE, VENUE_ERROR } from '../actions/types.js';

const initialState = {
  venue: null,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_VENUE:
      return {
        ...state,
        venue: action.payload,
        loading: false,
        error: null,
      };
    case VENUE_ERROR:
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
