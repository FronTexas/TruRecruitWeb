import createReducer from '../lib/createReducer';

export const active_user = createReducer(null,{
	["SET_ACTIVE_USER"](state,action){
		return action.uid;		
	},

	["SIGNUP_SUCCESS"](state,action){
		return action.active_user;
	}
})

export const active_user_profile = createReducer(null,{
	["FETCH_ACTIVE_USER_DONE"](state,action){
		return action.active_user_profile
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

export const recruiter_who_scanned_you = createReducer([],{
	["RECRUITER_WHO_SCANNED_YOU_UPDATED"](state,action){
		return action.recruiter_who_scanned_you;
	}
})

export const resume_url = createReducer(null,{
	["FETCH_ACTIVE_USER_RESUME_URL_DONE"](state,action){
		return action.resume_url;
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


