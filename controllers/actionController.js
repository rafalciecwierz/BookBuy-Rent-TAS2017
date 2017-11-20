var Book = require('../models/bookModel');
var Author = require('../models/authorModel');
var Tag = require('../models/tagModel');
var Comment = require('../models/commentModel');
var mongoose = require('mongoose');
var async = require('async');


exports.search = function(req, res, next) {
	async.parallel({
    book: function(callback) {
      Book.find().regex('title', req.body.search)
		//.populate('tag')
        //.populate('author')
        .exec(callback);
    },
	author1 : function(callback) {
      Author.find().regex('first_name', req.body.search )
        .exec(callback);
    },
	author2 : function(callback) {
      Author.find().regex('family_name', req.body.search)
        .exec(callback);
    },
	//if(req.body.search.split(' ') > 1)
	author3 : function(callback) {
      Author.find().regex('name',req.body.search)
        .exec(callback);
    },
	}, function(err, results) {
    if (err) { return next(err); }
	//if(results.author1.length > 0) {
		
	//}
	res.json(results);
  });
	
};

exports.addToWishlist = function(req, res, next) {
	res.json({message: "Not implemented - adding to wishlist!"});
};

exports.addToCart = function(req, res, next) {
	res.json({message: "Not implemented - adding to cart!"});
};