var Book = require('../models/bookModel');
var Author = require('../models/authorModel');
var Tag = require('../models/tagModel');
var Comment = require('../models/commentModel');
var mongoose = require('mongoose');
var async = require('async');


// List of comments for book
exports.comment_detail = function(req, res, next) {
    var id = mongoose.Types.ObjectId(req.params.id.trim());
	async.parallel({
	comments: function(callback) {
		Comment.find().byBookId(id)
		.populate('user')
		.populate('book')
		.exec(callback);
	}
	}, function(err, results) {
    if (err) { return next(err); }
	res.json(results);
  });
    
};

// Handle comment create on POST
exports.comment_create = function(req, res,next) {
	
	var bookId = mongoose.Types.ObjectId(req.params.id.trim());
	
	var comment = new Comment({
		//TYMCZASOWE
		user: req.body.userId,
		book: bookId,
		mark: req.body.mark,
		comment: req.body.comment
	});
	
	comment.save(function(err,added) {
		if(err) {return next(err);}
		res.json(added);
	});
};

// Display comment delete form on GET
exports.comment_delete = function(req, res, next) {
    var id = mongoose.Types.ObjectId(req.params.id.trim());
    async.series({
        comment: function(callback) {     
            Comment.findById(id).exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
		Comment.findByIdAndRemove(results.comment._id, function deleteComment(err, deleted) {
                if (err) { return next(err); }
                res.json(deleted);
            });
    });
};

// Handle comment delete on POST
exports.comment_update = function(req, res, next) {
	var id = mongoose.Types.ObjectId(req.params.id.trim());
    var comment = new Comment(
      { user: req.body.userId,
		book: bookId,
		mark: req.body.mark,
		comment: req.body.comment,
		_id: id
	  });
	 Comment.findByIdAndUpdate(id, comment, {}, function (err,thecomment) {
		if (err) { return next(err); }
		res.json(comment);
	 });
};