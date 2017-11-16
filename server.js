var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
require('dotenv').config();
// var Comment = require('./model/books');

var app = express();
var router = express.Router();

var port = process.env.API_PORT || 3001;

mongoose.connect('mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASSWORD + '@ds163595.mlab.com:63595/book-shop');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', ' * ');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no - cache');
  next();
});

router.get('/', function(req, res) {
  res.json({message: 'API Initialized!'});
});

//
// router.route('/books')
// //retrieve all comments from the database
//   .get(function(req, res) {
//   //looks at our Comment Schema
//   // Book.find(function(err, books) {
//   //   if (err)
//   //     res.send(err);
//   //
//   //   //responds with a json object of our database comments.
//   //   res.json(books)
//   });
// })
// //post new comment to the database
//   .post(function(req, res) {
//   var book = {};
//   // var book = new Book();
//   //body parser lets us use the req.body
//   book.author = req.body.author;
//   book.text = req.body.text;
//   book.save(function(err) {
//     if (err)
//       res.send(err);
//     res.json({
//       message: 'Book successfully added !'
//     });
//   });
// });
app.use('/api', router);

app.listen(port, function() {
  console.log(`api running on port ${port}`);
});
