var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
require("dotenv").config();

var app = express();
var router = express.Router();

var port = process.env.API_PORT || 3001;

var Book = require("./src/models/bookModel");
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

router.get("/", function(req, res) {
	res.json({message: "API Initialized!"});
});


app.use("/api", router);
app.get("/api/books",function(req, res){
	Book.getBooks(function(err, books){
		if(err){
			throw err;
		}
		res.json(books);
	});
});

app.get("/api/books", function(req, res)  {
	Book.getBooks(function(err, books){
	//getBooks((err, books) {
		if(err){
			throw err;
		}
		res.json(books);
	});
});

app.get("/api/books/:_id", function(req, res)  {
	Book.getBookById(req.params._id, function(err, book)  {
		if(err){
			throw err;
		}
		res.json(book);
	});
});

app.post("/api/books", function(req, res)  {
	var book = req.body;
	Book.addBook(book, function(err, book)  {
		if(err){
			throw err;
		}
		res.json(book);
	});
});

app.put("/api/books/:_id", function(req, res)  {
	var id = req.params._id;
	var book = req.body;
	Book.updateBook(id, book, {}, function(err, book)  {
		if(err){
			throw err;
		}
		res.json(book);
	});
});

app.delete("/api/books/:_id", function(req, res)  {
	var id = req.params._id;
	Book.removeBook(id, function(err, book)  {
		if(err){
			throw err;
		}
		res.json(book);
	});
});


app.listen(port, function() {
	console.log(`api running on port ${port}`);
});
