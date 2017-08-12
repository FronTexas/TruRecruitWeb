import createReducer from '../lib/createReducer';

export const active_user = createReducer(null,{
	["SET_ACTIVE_USER"](state,action){
		return action.uid;		
	},

	["SIGNUP_SUCCESS"](state,action){
		return action.active_user;
	}
})

export const update_user_profile_success = createReducer(false,{
	["UPDATE_USER_PROFILE_SUCCESS"](state,action){
		return true;
	},
	["UPDATE_USER_PROFILE_FAILURE"](state,action){
		return false;
	}
})


export const upload_file_success = createReducer(false,{
	["FILE_UPLOAD_SUCCESS"](state,action){
		return true;
	},
	["FILE_UPLOAD_FAILURE"](state,action){
		return false;
	}
})

