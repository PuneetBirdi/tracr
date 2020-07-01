import {
  SET_LOADING,
  ADD_PARTY,
  PARTY_ERROR,
  GET_PARTIES,
  FILTER_PARTIES,
  CLEAR_PARTIES,
  CLEAR_FILTER,
} from '../actions/types';

const initialState = {
  parties: null,
  error: null,
  filtered: null,
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
    case CLEAR_PARTIES:
      return {
        ...state,
        parties: null,
        filtered: null,
      };
    case PARTY_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case FILTER_PARTIES:
      return {
        ...state,
        filtered: state.parties.filter((party) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return (
            party.contact.name.match(regex) || party.server.name.match(regex)
          );
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
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
