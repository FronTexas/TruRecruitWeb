export function createNewUser(user){
	return (dispatch,getState)=>{
		const {firebaseRef} = getState();
		const {firstName,lastName,email,password} = user;

		firebaseRef.auth().createUserWithEmailAndPassword(email,password)
		.then(user => {
			firebaseRef.database().ref(`attendees/${user.uid}`).set({
				email,
				name:`${firstName} ${lastName}`,
				firstName,
				lastName
			}, error => {
				if(error){
					console.log(error);
				}else{
					dispatch({
						type:"SIGNUP_SUCCESS",
						active_user:user.uid
					});
				}
			})
		});
	}
	
}

export function fetchActiveUserProfile(uid){
	return (dispatch,getState) => {
		const {firebaseRef,active_user} = getState();
		const uid = window.localStorage.getItem('uid') || active_user ;		
		firebaseRef
		.database()
		.ref(`attendees/${uid}`)
		.once('value')
		.then(snap=>{
			if (!snap.val()) return
			var active_user_profile = snap.val();
			active_user_profile.uid = uid;
			dispatch({
				type:"FETCH_ACTIVE_USER_DONE",
				active_user_profile
			})
		})
	}
}

export function fetchActiveUserResumeURL(){
	return (dispatch,getState)=>{
		const {firebaseRef,active_user} = getState();
		const uid = window.localStorage.getItem('uid') || active_user;		
		const resume_ref = firebaseRef.storage().ref().child(`attendees/${uid}/resume.pdf`);
		resume_ref.getDownloadURL().then((resume_url)=>{
			dispatch({
				type:"FETCH_ACTIVE_USER_RESUME_URL_DONE",
				resume_url
			})
		});
	}
}

export function fetchRecruiterWhoScannedYou(){
	return (dispatch,getState)=>{
		const {firebaseRef} = getState();
		const uid = window.localStorage.getItem('uid');
		firebaseRef
		.database()
		.ref(`attendees/${uid}/recruiter_who_scanned_you`)
		.on('value',(snap)=>{
			const recruiter_who_scanned_you = snap.val();
			dispatch({
				type:"RECRUITER_WHO_SCANNED_YOU_UPDATED",
				recruiter_who_scanned_you
			})
		})
	}
}

export function resetUploadStatus(){
	return (dispatch,getState)=>{
		dispatch({
			type:"RESET_UPLOAD_STATUS"
		})
	}
}

export function resetUpdateUserProfileStatus(){
	return (dispatch,getState)=>{
		dispatch({
			type:"RESET_UPDATE_USER_PROFILE_STATUS"
		})
	}
}

export function setActiveUser(uid){
	return (dispatch,getState)=>{
		dispatch({
			type:"SET_ACTIVE_USER",
			uid
		});
	}
}

export function signIn(email,password){
	return (dispatch,getState)=>{
		const {firebaseRef} = getState();
		firebaseRef.auth()
		.signInWithEmailAndPassword(email,password)
		.catch(error=>{
			// NOTE: this will trigger onAuthChange, which in turn will trigger setActiveUser
			if(error){
				console.log(error);
			}
		})
	}
}

export function signOut(){
	return (dispatch,getState)=>{
		const {firebaseRef} = getState();
		firebaseRef.auth().signOut();
	}
}

export function updateUserProfile(fields){
	return (dispatch,getState)=>{
		const {firebaseRef,active_user} = getState();
		firebaseRef
		.database()
		.ref(`attendees/${active_user}`)
		.once('value')
		.then((snap)=>{
			var user = snap.val();
			var target = {};
			Object.assign(target,user,fields);
			var updates = {};
			updates['/attendees/'
			+ active_user] = target;
			firebaseRef.database().ref().update(updates).then(()=>{
				dispatch({
					type:"UPDATE_USER_PROFILE_SUCCESS"
				})
			});
		})
	}
}

export function uploadProfilePicture(file){
	return (dispatch,getState)=>{
		let {firebaseRef,active_user} = getState()
		let storageRef = firebaseRef.storage().ref()
		let databaseRef = firebaseRef.database().ref(); 
		var active_userStorageRef = storageRef.child(`attendees/${active_user}/profilePicture.jpg`)
		active_userStorageRef.put(file).then((snap)=>{
			if(snap){
				updateUserProfile({'prof_pic_url':snap.downloadURL})(dispatch,getState)
				dispatch({
					type:"PROFILE_PICTURE_UPLOAD_SUCCESS"
				})
			}

		})

	}
}

export function uploadResume(file){
	return (dispatch,getState)=>{
		const {firebaseRef,active_user} = getState();
		var storageRef = firebaseRef.storage().ref();
		var active_userStorageRef = storageRef.child(`attendees/${active_user}/resume.pdf`);
		active_userStorageRef.put(file).then((snap)=>{
			if (snap.downloadURL){
				updateUserProfile({'resume_url':snap.downloadURL})(dispatch,getState)
				dispatch({
					type:"FILE_UPLOAD_SUCCESS",
					resume_url: snap.downloadURL
				})
			}
		})
	}
}



