var Book = require('../models/bookModel');
var Author = require('../models/authorModel');
var Tag = require('../models/tagModel');
var Cart = require('../models/cartModel')
var Comment = require('../models/commentModel');
var mongoose = require('mongoose');
var async = require('async');


exports.search = function(req, res, next) {
	var search = req.body.search.toLowerCase();

	async.parallel({	
	books: function(callback) {
	  Book.aggregate([{$project: {newTitle: {$toLower: '$title'}}},{$match: {newTitle : {$regex : search }}}])
		.exec(callback);
    },
	authors : function(callback) {
		Author.aggregate([{$project: {name: {$toLower: {$concat: ["$first_name"," ","$family_name"]}}}}, {$match: {name : {$regex : search}}}])
		.exec(callback);
    },
	tags: function(callback) {
		Tag.aggregate([{$project: {newName: {$toLower: '$name'}}},{$match: {newName : {$regex : search }}}])
		.exec(callback);
	},
	}, function(err, results) {
		if (err) { return next(err); }
		async.parallel({				
			idsB : function (callback) {
				if(results.books) {
					var tmp = results.books.map(function (obj){ return mongoose.Types.ObjectId(obj._id)});
					callback(null,tmp);
				}
				else 
					callback(err);
			},
			idsA : function (callback) {
				if(results.authors) {
					var tmp = results.authors.map(function (obj){ return mongoose.Types.ObjectId(obj._id)});
					callback(null,tmp);
				}
				else 
					callback(err);
			},
			idsT : function (callback) {
				if(results.tags) {
					callback(null,results.tags.map(function (obj){ return mongoose.Types.ObjectId(obj._id)}));
				}
				else 
					callback(err);
			}
		}, function(err, results2) {
			if (err) { return next(err); }
			async.parallel({	
				books1 : function (callback) {
					Book.find({ _id : {$in : results2.idsB}})
					.populate('tag')
					.populate('author')
					.exec(callback);
				},
				books2 : function(callback) {
					Book.find({ author: {$in : results2.idsA}})
					.populate('tag')
					.populate('author')
					.exec(callback);
				},
				books3: function(callback) {
					Book.find({ tag: {$in : results2.idsT}})
					.populate('tag')
					.populate('author')
					.exec(callback);
				},
				}, function(err, results3) {
					res.json(results3);
			});	
		});	
	});	
};

exports.user_books = function(req, res, next) {
	async.parallel({
		
	}, function(err, results) {
    if (err) { return next(err); }
	//res.json(results);
	res.json({message: "Not implemented - bought books!"});
  });
};

exports.addToWishlist = function(req, res, next) {
	res.json({message: "Not implemented - adding to wishlist!"});
};

exports.addToCart = function(req, res, next) {
	console.log("Adding to cart.")
	var bookId = req.body.bookId;
	var cart = new Cart(req.session.cart || {});
	Book.findById(bookId, function(err, book) {
		if(err){
			console.log("\n Book doesn't exist. \n");
			res.json({bookFound: false, message: "Couldn't find the book."});
		}
		cart.add(book, bookId);
		req.session.cart = cart;
		console.log(req.session.cart);
		req.session.save();
		res.json({message: "Added to cart.", totalQty: cart.qty, totalPrice: cart.totalPrice});
		res.send();
	});
};