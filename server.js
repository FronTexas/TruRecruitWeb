require('dotenv').config();
const express = require('express');
const path = require('path');
var port = process.env.PORT || 8080;

const app = express();

app.use(express.static(__dirname + '/src/'));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const routes = require('./src/api/routes/twilioRoutes');
routes(app);

app.get('*',(req,res)=>{
	res.sendFile(path.resolve(__dirname + '/src/','index.html'));
});

app.listen(port);
console.log('Server started');



