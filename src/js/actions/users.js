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
					console.log("Successfully creating new user");
					dispatch({
						type:"SIGNUP_SUCCESS",
						activeUser:user
					});
				}
			})
		});
	}
	
}

export function updateUserProfile(fields){
	return (dispatch,getState)=>{
		const {firebaseRef,activeUser} = getState();
		firebaseRef.database().ref(`/attendees/${activeUser.uid}/`)
		.once('value')
		.then((snap)=>{
			var user = snap.val();
			var target = {};
			object.assign(target,user,fields);
			window.target = target;
		})
	}
}

