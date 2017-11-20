var Book = require('../models/bookModel');
var Author = require('../models/authorModel');
var Tag = require('../models/tagModel');
var Comment = require('../models/commentModel');
var mongoose = require('mongoose');
var async = require('async');


exports.search = function(req, res, next) {
	async.parallel({
    book: function(callback) {
      Book.find().regex({'title': { '$regex': req.body.search, '$options': 'i'}})
		//.populate('tag')
        //.populate('author')
        .exec(callback);
    },
	author1 : function(callback) {
      Author.find().regex({'first_name': {'$regex': req.body.search, '$options': 'i'}})
        .exec(callback);
    },
	author2 : function(callback) {
      Author.find().regex({'family_name': {'$regex': req.body.search, 'options': 'i'}})
        .exec(callback);
    },
	//if(req.body.search.split(' ') > 1)
	author3 : function(callback) {
      Author.find().regex({'name': {'$regex': req.body.search, 'options': 'i'}})
        .exec(callback);
    },
	}, function(err, results) {
    if (err) { return next(err); }
	//if(results.author1.length > 0) {
		
	//}
	res.json(results);
  });
	
};