import createReducer from '../lib/createReducer';

export const activeUser = createReducer(null,{
	["SIGNUP_SUCCESS"](state,action){
		console.log("In activeUser reducer");
		return action.activeUser;
	}
})