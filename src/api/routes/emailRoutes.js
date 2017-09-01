module.exports = (app)=>{
	let emailController = require('../controllers/emailController');
	app.route('/email_qr_code')
		.post(emailController.sendQRCodeAsEmail);
};