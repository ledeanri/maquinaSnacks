var express = require('express');
var bodyParser = require('body-parser');

var porta = '3000';
var app = module.exports = express();

app.listen(porta);

app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());

app.use(function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin','*');
	res.setHeader('Access-Control-Allow-Methods', 'GET,POST, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});
