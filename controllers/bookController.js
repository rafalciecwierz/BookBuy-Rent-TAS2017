var Book = require('../models/bookModel');
var Author = require('../models/authorModel');
var Tag = require('../models/tagModel');
var Comment = require('../models/commentModel');
var mongoose = require('mongoose');
var async = require('async');
var path = require('path');

// Display list of all books
exports.book_list = function(req, res, next) {
    Book.find({})
    .populate('author')
	.populate('tag')
    .exec(function (err, list_books) {
      if (err) { return next(err); }
	res.json(list_books);
    });
};

// Display detail page for a specific book
exports.book_detail = function(req, res, next) {
    var id = mongoose.Types.ObjectId(req.params.id.trim());
	async.parallel({
    book: function(callback) {     
        
      Book.findById(id)
		.populate('tag')
        .populate('author')
        .exec(callback);
    },
	/*comments: function(callback) {
		Comment.find().byBookId(id)
		.populate('user')
		.exec(callback);
	}*/
	}, function(err, results) {
    if (err) { return next(err); }
	res.json(results.book);
  });
    
};

//Book cover
exports.book_cover = function(req,res,next) {

	var fileName = req.params.name.trim();
	var pathToFile = __dirname + '\\..\\images\\' + fileName.substr(1) + ".jpg";
	res.sendFile(path.resolve(pathToFile), function (err) {
    if (err) {
      next(err);
    } else {
      console.log('Sent:', fileName);
    }
  });
};

// Book create
exports.book_create = function(req, res,next) {

	Author.findOne({ 'first_name': req.body.first_name, 'family_name': req.body.family_name })
		.exec( function(err, found_author) {
			 if (err) { return next(err); }
			 
			 if (found_author) { 
				 //author exists, add book
				 var book = new Book({
					title: req.body.title, 
					author: found_author._id, 
					description: req.body.description,
					cover: req.file.filename,
					//cover: req.body.cover,
					price: req.body.price,
					likes: req.body.likes,
					count: req.body.count,
					tag: (typeof req.body.tag==='undefined') ? [] : req.body.tag
					 }); 
				book.save(function (err,saved) {
					if (err) { return next(err); }
					res.json(saved);
				});
			}
			 else {
				 //author not exist, add author and book
				var author = new Author({
					first_name: req.body.first_name, 
					family_name: req.body.family_name
				});
				author.save(function (err,added) {
					if (err) { return next(err); }
					   //successful - redirect to new author record.
					   var book = new Book({
						title: req.body.title, 
						author: added._id, 
						description: req.body.description,
						cover: req.file.filename,
						//cover: req.body.cover,
						price: req.body.price,
						likes: req.body.likes,
						count: req.body.count,
						tag: (typeof req.body.tag==='undefined') ? [] : req.body.tag
						 }); 
				book.save(function (err,saved) {
					if (err) { return next(err); }
					res.json(saved);
				});
			});		
		}
	});
};

// Book delete
exports.book_delete = function(req, res, next) {
    
    async.series({
        book: function(callback) {     
            Book.findById(req.params.id.trim()).exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
		Book.findByIdAndRemove(results.book._id, function deleteBook(err, thebook) {
                if (err) { return next(err); }
				async.series({
					book_author : function(callback) {
						Author.findById(results.book.author).exec(callback);
					},
					authors_books: function(callback) {
						Book.find({ author: results.book.author },callback);
					},
				}, function(err, results2) {
					if (err) { return next(err); }
					if(results2.authors_books.length == 0) {
						Author.findByIdAndRemove(results2.book_author._id, function deleteAuthor(err) {
						if (err) { return next(err); }
						});
					}
				});
                res.json(thebook);
            });
    });

};

// Book update
exports.book_update = function(req, res, next) {

	Author.findOne({ 'first_name': req.body.first_name, 'family_name': req.body.family_name })
		.exec( function(err, found_author) {
			 if (err) { return next(err); }
			 
			 if (found_author) { 
				 var book = new Book({
					title: req.body.title, 
					author: found_author._id, 
					description: req.body.description,
					//cover: req.body.cover,
					cover: req.file.filename,
					price: req.body.price,
					likes: req.body.likes,
					count: req.body.count,
					tag: (typeof req.body.tag==='undefined') ? [] : req.body.tag,
					_id:req.params.id
					 }); 
				Book.findByIdAndUpdate(req.params.id, book, {}, function (err,thebook) {
					if (err) { return next(err); }
					res.json(book);
				});
			}
			 else {
				var author = new Author({
					first_name: req.body.first_name, 
					family_name: req.body.family_name
				});
				 author.save(function (err,added) {
					if (err) { return next(err); }
					   var book = new Book({
						title: req.body.title, 
						author: added._id, 
						description: req.body.description,
						//cover: req.body.cover,
						cover: req.file.filename,
						price: req.body.price,
						likes: req.body.likes,
						count: req.body.count,
						tag: (typeof req.body.tag==='undefined') ? [] : req.body.tag,
						_id:req.params.id
						 }); 
				Book.findByIdAndUpdate(req.params.id, book, {}, function (err,thebook) {
					if (err) { return next(err); }
					//successful - redirect to book detail page.
					res.json(book);
				});
				});
			 }
		});

};