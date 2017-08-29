import twilio from 'twilio';
const account_sid = 'AC71f8c3c9fc9055bc12d6bab9a035b5b8';
const auth_token = 'ffceae70948d39c9ea6c1f2bdb2c5478';
const client = new twilio(account_sid,auth_token);
const _from = '+15123615127';

export function sendQRCodeAsText(to,link_to_qr_code){
	return (dispatch,getState)=>{
		client.messages.create({
			body:'Hello from TruRecruit! Here is the picture of your QR code! Good luck on your Job Search!',
			to,
			from:_from,
			mediaUrl: link_to_qr_code,
		}).then((message)=> console.log(message.sid));
	}
}