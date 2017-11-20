var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
require("dotenv").config();
// var Comment = require('./model/books');
var api = require('./routes/api');

var app = express();
//var router = express.Router();

var port = process.env.API_PORT || 3001;

//var Book = require("./src/models/bookModel");
mongoose.connect("mongodb://" + process.env.DB_USER + ":" + process.env.DB_PASSWORD + "@ds163595.mlab.com:63595/book-shop");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", " * ");
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.setHeader("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT, DELETE");
	res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
	res.setHeader("Cache-Control", "no - cache");
	next();
});

app.use('/api',api);


app.listen(port, function() {
	console.log(`api running on port ${port}`);
});
