import { combineReducers } from 'redux';
import authReducer from './authReducer';
import venueReducer from './venueReducer';
import partyReducer from './partyReducer';

export default combineReducers({
  auth: authReducer,
  venue: venueReducer,
  party: partyReducer,
});
