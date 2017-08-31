import axios from 'axios';

export function sendQRCodeAsText(to,link_to_qr_code){
	axios.post('./twilio',{
		to,
		link_to_qr_code
	})
	.then((response)=>{
		console.log(response);
	})
	.catch((error)=>{
		console.log(error);	
	})
}