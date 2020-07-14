import { combineReducers } from 'redux';
import authReducer from './authReducer';
import venueReducer from './venueReducer';
import partyReducer from './partyReducer';
import serverReducer from './serverReducer';
import registerReducer from './registerReducer';

export default combineReducers({
  auth: authReducer,
  venue: venueReducer,
  party: partyReducer,
  server: serverReducer,
  register: registerReducer,
});
