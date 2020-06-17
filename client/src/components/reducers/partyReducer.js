import {
  SET_LOADING,
  ADD_PARTY,
  PARTY_ERROR,
  GET_PARTIES,
} from '../actions/types';

const initialState = {
  parties: null,
  error: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PARTY:
      return {
        ...state,
        loading: false,
      };
    case GET_PARTIES:
      return {
        ...state,
        parties: action.payload.data,
        loading: false,
      };
    case PARTY_ERROR:
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
