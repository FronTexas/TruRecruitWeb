import createReducer from '../lib/createReducer';

export const firebaseRef = createReducer(null,{
	["SET_FIRE_BASE_REF"](state,action){
		return action.value;
	}
})