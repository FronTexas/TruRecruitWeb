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

export function setActiveUser(uid){
	return (dispatch,getState)=>{
		dispatch({
			type:"SET_ACTIVE_USER",
			uid
		});
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

export function uploadResume(file){
	return (dispatch,getState)=>{
		console.log('In Upload Resume');
		const {firebaseRef,active_user} = getState();
		var storageRef = firebaseRef.storage().ref();
		var active_userStorageRef = storageRef.child(`attendees/${active_user}/resume.pdf`);

		active_userStorageRef.put(file).then((snap)=>{
			dispatch({
				type:"FILE_UPLOAD_SUCCESS"
			})
		})
	}
}

