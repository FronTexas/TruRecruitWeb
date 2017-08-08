import {combineReducers} from 'redux';
import createReducer from '../lib/createReducer';


import * as firebaseReducer from './firebase';

export default combineReducers(Object.assign(
	firebaseReducer
));
