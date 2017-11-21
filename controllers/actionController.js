var Book = require('../models/bookModel');
var Author = require('../models/authorModel');
var Tag = require('../models/tagModel');
var Comment = require('../models/commentModel');
var mongoose = require('mongoose');
var async = require('async');


exports.search = function(req, res, next) {
	async.parallel({
    
	books: function(callback) {
      Book.find().regex('title', req.body.search)
		.populate('tag')
        .populate('author')
        .exec(callback);
    },
	authors : function(callback) {
      Author.find({})
        .exec(callback);
    },
	tags: function(callback) {
		Tag.find().regex('name',req.body.search.toLowerCase())
		.exec(callback);
	},
	}, function(err, results) {
		if (err) { return next(err); }
			res.json(results);
/*
			function asyncFunc1(err,callback) {
				if (err) { return next(err); }
				var book_list = [];
				if(results.books) {
					for(i = 0; i < results.books.length; i++){
						book_list.push(results.books[i]);
					}
				}
				if(results.tags) {
					for(i = 0; i < results.tags.length; i++){
						Book.find().byTagId(results.tags[i]._id)
							.populate('tag')
							.populate('author')
							.exec(function(err,found_books) {
								//console.log(found_books);
								for(j = 0; j <found_books.length; j++){
									book_list.push(found_books[j]);
								}
						});
					}
				}
				if(results.authors) {
					for(i = 0;i  <results.authors.length; i++){
						var name = results.authors[i].name.toLowerCase();
						if (name.indexOf(req.body.search.toLowerCase()) > -1)
							Book.find().byAuthorId(results.authors[i]._id)
								.populate('tag')
								.populate('author')
								.exec(function(err,found_books2) {
								//console.log(found_books2);
								for(j = 0; j <found_books2.length; j++){
									book_list.push(found_books2[j]);
								}
						});
					}
				}
				callback(null, book_list);
			}
			
			function asyncFunc2(function(err,data){
				if (err) { return next(err); }
					console.log(data);
					res.json(data);
			})
			{};
			asyncFunc1().then(asyncFunc2);
*/
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
	res.json({message: "Not implemented - adding to cart!"});
};