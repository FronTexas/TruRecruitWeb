import * as ErrorMessages from './errorMessages';


export const required = (text) => {
	if (text){
		return null;
	}else{
		return ErrorMessages.isRequired
	}
}