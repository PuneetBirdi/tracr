import { SET_LOADING, GET_VENUE_RESULT, LOGIN_FAIL } from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { login } from './venueActions';

//GET RESULTS OF A VENUE FROM THE GOOGLE PLACES API
// logging in the user, and grabbing the JWT token
