import axios from 'axios';

export function sendQRCodeAsEmail(to,message_in_html){
	console.log('to = ',to);
	console.log('message_in_html = ', message_in_html);	
	axios.post('./email_qr_code',{
		to,
		message_in_html
	})
	.then((response)=>{
		console.log(response);
	})
	.catch((error)=>{
		console.log(error);	
	})
}