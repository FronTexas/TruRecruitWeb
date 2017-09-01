var nodemailer = require('nodemailer');

exports.sendQRCodeAsEmail = (req,res)=>{
	const {to,message_in_html} = req.body;
	var transporter = nodemailer.createTransport(
	{
		service:'gmail',
		auth:{
			user: process.env.TRURECRUIT_EMAIL,
			pass: process.env.TRURECRUIT_PASSWORD
		}
	});

	var mailOptions = {
		from: process.env.TRURECRUIT_EMAIL,
		to, 
		subject: 'Your TruRecruit QR Code',
		html: message_in_html
	}

	transporter.sendMail(mailOptions,(error,info)=>{
		if(error){
			res.json({error});
		}else{
			res.json({info});
		}
	})

}