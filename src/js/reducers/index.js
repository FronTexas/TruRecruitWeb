import {combineReducers} from 'redux';
import createReducer from '../lib/createReducer';


import * as firebaseReducer from './firebase';
import * as usersReducer from './users';

export default combineReducers(Object.assign(
	firebaseReducer,
	usersReducer
));
