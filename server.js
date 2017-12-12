var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var expressValidator = require("express-validator");
var path = require("path");
require("dotenv").config();
var passport = require("passport");
var session = require('express-session');
var api = require("./routes/api");

var app = express();
//var router = express.Router();


// Passport init

app.use(session({ secret: "cats" }));
app.use(passport.initialize());
app.use(passport.session());

var port = process.env.API_PORT || 3001;
// view engine setup
//app.set("views", path.join(__dirname, "views"));
//app.set("view engine", "js");

mongoose.connect("mongodb://" + process.env.DB_USER + ":" + process.env.DB_PASSWORD + "@ds163595.mlab.com:63595/book-shop");


app.use(bodyParser.json({limit: "5mb"}));
app.use(bodyParser.urlencoded({extended: true, limit: "5mb"}));
app.use(express.static(path.join(__dirname)));
app.use(expressValidator({
	//dozrobienia funkcja validująca czy email i user są w bazie

	errorFormatter: function(param, msg, value) {
		var namespace = param.split("."), 
			root    = namespace.shift(), 
			formParam = root;
		while(namespace.length) {
			formParam += "[" + namespace.shift() + "]";
		}
		return {
			param : formParam,
			msg   : msg,
			value : value
		};
	}
}));

app.use(function(req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", " * ");
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.setHeader("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT, DELETE");
	res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
	res.setHeader("Cache-Control", "no - cache");
	next();
});

app.use("/api",api);

app.listen(port, function() {
	console.log(`api running on port ${port}`);
});
module.exports = app;