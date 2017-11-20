var Author = require('../models/authorModel');
var async = require('async');
var Book = require('../models/bookModel');
var mongoose = require('mongoose');

// Display list of all Authors
exports.author_list = function(req, res, next) {
    Author.find()
    .sort([['family_name', 'ascending']])
    .exec(function (err, list_authors) {
      if (err) { return next(err); }
	 res.json(list_authors);
    });
};

// Display detail page for a specific Author
exports.author_detail = function(req, res, next) {
    var id = mongoose.Types.ObjectId(req.params.id.trim());
	async.parallel({
    author: function(callback) {     
      Author.findById(id)
        .exec(callback);
    },
    authors_books: function(callback) {
      Book.find().byAuthorId(id)
		.populate('tag')
        .exec(callback);
    },
  }, function(err, results) {
    if (err) { return next(err); }
	res.json(results);
  });
    
};

// Author create
exports.author_create = function(req, res, next) {
   
	Author.findOne({ 'first_name': req.body.first_name, 'family_name': req.body.family_name })
		.exec( function(err, found_author) {
			 console.log('found_author: ' + found_author);
			 if (err) { return next(err); }
			 
			 if (found_author) { 
				 res.json(found_author);
			 }
			 else {
				 var author = new Author(
				  { first_name: req.body.first_name, 
					family_name: req.body.family_name
				   });
				 author.save(function (err, added) {
					if (err) { return next(err); }
					   res.json(added);
					});
			 } 
		 });
};


// Author delete
exports.author_delete = function(req, res, next) {

    async.parallel({
        author: function(callback) {     
            Author.findById(req.params.id.trim()).exec(callback);
        },
        authors_books: function(callback) {
          Book.find({ 'author': req.params.id },'title description').exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.authors_books.length > 0) {
			for (i = 0; i < results.authors_books.length; i++) {
                Book.findByIdAndRemove(results.authors_books[i]._id, function deleteBook(err) {
				if(err) {return next(err);} });
                }
			Author.findByIdAndRemove(req.params.id, function deleteAuthor(err,deleted) {
                if (err) { return next(err); }
                res.json(deleted);
            });
        }
        else {
            Author.findByIdAndRemove(req.params.id, function deleteAuthor(err,deleted) {
                if (err) { return next(err); }
                res.json(deleted);
            });

        }
    });

};

// Author update
exports.author_update = function(req, res, next) {

    var author = new Author(
      {
      first_name: req.body.first_name,
      family_name: req.body.family_name,
      _id: req.params.id
      });
	Author.findByIdAndUpdate(req.params.id, author, {}, function (err,theauthor) {
		if (err) { return next(err); }
		   res.json(theauthor);
		});
};