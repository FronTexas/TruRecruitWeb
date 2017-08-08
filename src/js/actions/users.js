export function createNewUser(user){
	const {firstName,lastName,email,password} = user;
	return {
		type: "CREATE_NEW_USER",
		firstName,
		lastName,
		email,
		password
	}
}
