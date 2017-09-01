const twilioRoutes = require('./twilioRoutes');
const emailRoutes = require('./emailRoutes');

module.exports = (app)=>{
	twilioRoutes(app);
};
