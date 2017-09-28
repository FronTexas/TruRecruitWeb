var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
		service: "gmail",
		auth:{
				type: 'OAuth2',
				user: process.env.TRURECRUIT_EMAIL,
				clientId: process.env.GOOGLE_API_CLIENT_ID,
				clientSecret: process.env.GOOGLE_API_CLIENT_SECRET,
				refreshToken:process.env.GOOGLE_API_REFRESH_TOKEN,
				accessToken:process.env.GOOGLE_API_ACCESS_TOKEN
			}
})

exports.sendQRCodeAsEmail = (req,res)=>{
	const {to,message_in_html} = req.body;

	var mailOptions = {
		from: process.env.TRURECRUIT_EMAIL,
		to, 
		subject: 'Your TruRecruit QR Code',
		html: message_in_html
	}

	transporter.sendMail(mailOptions,(error,info)=>{
		console.log('error = ',error)
		if(error){
			res.json({error});
		}else{
			res.json({info});
		}
	})

}