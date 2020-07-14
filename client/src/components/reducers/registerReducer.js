import { SET_LOADING, GET_VENUE_RESULT } from '../actions/types';

const initialState = {
  venue: null,
  user: null,
  loading: false,
  result: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_VENUE_RESULT:
      return {
        ...state,
        result: action.payload,
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
