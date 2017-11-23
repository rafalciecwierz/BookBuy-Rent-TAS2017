var Book = require('../models/bookModel');
var async = require('async');
var Tag = require('../models/tagModel');
var mongoose = require('mongoose');

// Display list of all Tag
exports.tag_list = function(req, res, next) {
    Tag.find()
    .sort([['name', 'ascending']])
    .exec(function (err, list_tags) {
      if (err) { return next(err); }
	 res.json(list_tags);
    });
};

// Display detail page for a specific Tag
exports.tag_detail = function(req, res, next) {
	var id = mongoose.Types.ObjectId(req.params.id.trim()); 
    async.parallel({
    tag: function(callback) {  
      Tag.findById(id)
        .exec(callback);
    },
        
    tag_books: function(callback) {            
	  Book.find().byTagId(id)
      .exec(callback);
    },

  }, function(err, results) {
    if (err) { return next(err); }
	res.json(results);
  });
};

// Tag create
exports.tag_create = function(req, res,next) {

    var tag = new Tag(
      { name: req.body.name }
    );
	Tag.findOne({ 'name': req.body.name })
		.exec( function(err, found_tag) {
			 if (err) { return next(err); }
			 
			 if (found_tag) { 
				 res.json(found_tag);
			 }
			 else {
				 
				 tag.save(function (err,added) {
				   if (err) { return next(err); }
				   res.json(added);
				 });
				 
			 }
			 
		 });
};

// Tag delete
exports.tag_delete = function(req, res, next) {

    async.series({
        tag: function(callback) {     
            Tag.findById(req.params.id).exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
		Tag.findByIdAndRemove(results.tag._id, function deleteTag(err, deleted) {
                if (err) { return next(err); }
                res.json(deleted);
            });
    });

};

// Tag update
exports.tag_update = function(req, res, next) {

    var tag = new Tag(
      { name: req.body.name,
	  _id: req.params.id}
    );
	 Tag.findByIdAndUpdate(req.params.id, tag, {}, function (err,thetag) {
		if (err) { return next(err); }
		res.json(tag);
	 });
};