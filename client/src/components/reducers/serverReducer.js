import { ADD_SERVER, DELETE_SERVER, SERVER_ERROR } from '../actions/types';

const initialState = {
  servers: null,
  errors: null,
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
