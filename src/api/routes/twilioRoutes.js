module.exports = (app)=>{
	let twilio_controller = require('../controllers/twilioController');
	app.route('/twilio')
		.post(twilio_controller.sendQRCodeAsText);
}