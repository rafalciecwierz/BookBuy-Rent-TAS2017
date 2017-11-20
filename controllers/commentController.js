var Book = require('../models/bookModel');
var Author = require('../models/authorModel');
var Tag = require('../models/tagModel');
var Comment = require('../models/commentModel');
var mongoose = require('mongoose');
var async = require('async');


// Display detail page for a specific comment
exports.comment_detail = function(req, res, next) {
    var id = mongoose.Types.ObjectId(req.params.id.trim());
	async.parallel({
    book: function(callback) {     
        
      Book.findById(id)
		.populate('tag')
        .populate('author')
        .exec(callback);
    },
	comments: function(callback) {
		Comment.find().byBookId(id)
		.populate('user')
		.exec(callback);
	}
	}, function(err, results) {
    if (err) { return next(err); }
    res.render('book_detail', { title: 'Title', book: results.book });
	//res.json(results.book,results.comments);
  });
    
};

// Display comment create form on GET
exports.comment_create_get = function(req, res, next) { 
	var mark = mongoose.model('Comment').schema.obj.mark.max;
	var marks = [];
	for(i=0;i<mark;i++){
		marks.push(i+1);}
    res.render('comment_form', { title: 'Add Comment', marks: marks });   
};

// Handle comment create on POST
exports.comment_create_post = function(req, res,next) {
	req.checkBody('title', 'Title must not be empty.').notEmpty();
    req.checkBody('first_name', 'Author first name must not be empty').notEmpty();
	req.checkBody('family_name', 'Author family name must not be empty').notEmpty();
	req.checkBody('cover', 'Cover must not be empty.').notEmpty();
	req.checkBody('price', 'Price must be a number.').matches(/\d+/);
	req.checkBody('price', 'Price must not be empty.').notEmpty();
	req.checkBody('count', 'Count must be a number.').matches(/\d+/);
	req.checkBody('count', 'Count must not be empty.').notEmpty();
    req.sanitize('title').escape();
    req.sanitize('first_name').escape();
	req.sanitize('family_name').escape();
	req.sanitize('summary').escape();
    req.sanitize('cover').escape();
	req.sanitize('price').escape();
	req.sanitize('count').escape();
    req.sanitize('title').trim();   
    req.sanitize('first_name').trim();
	req.sanitize('family_name').trim();
	req.sanitize('summary').trim();
    req.sanitize('cover').trim();
	req.sanitize('price').trim();
	req.sanitize('count').trim();

	var author = new Author({
		first_name: req.body.first_name, 
		family_name: req.body.family_name
	});
	
	var book1 = {
		title: req.body.title, 
		first_name: req.body.first_name,
		family_name: req.body.family_name,
		summary: req.body.summary,
		cover: req.body.cover,
		price: req.body.price,
		count: req.body.count,
		tag: (typeof req.body.tag==='undefined') ? [] : req.body.tag
	};
	
    var errors = req.validationErrors();

    if (errors) {
		console.log(errors);

        async.parallel({
            tags: function(callback) {
                Tag.find(callback);
            },
        }, function(err, results) {
            if (err) { return next(err); }
            
            // Mark selected tags as checked
            for (i = 0; i < results.tags.length; i++) {
				for(j = 0; j <book1.tag.length; j++) {
					if (book1.tag[j].toString() == results.tags[i]._id.toString()) {
						results.tags[i].checked='true';
					}
				}
            }

            res.render('book_form', { title: 'Create Book', tags:results.tags, book: book1, errors: errors });
        });

    } 
    else {
		Author.findOne({ 'first_name': req.body.first_name, 'family_name': req.body.family_name })
            .exec( function(err, found_author) {
                 if (err) { return next(err); }
                 
                 if (found_author) { 
                     //author exists, add book
					 var book = new Book({
						title: req.body.title, 
						author: found_author._id, 
						summary: req.body.summary,
						cover: req.body.cover,
						price: req.body.price,
						count: req.body.count,
						tag: (typeof req.body.tag==='undefined') ? [] : req.body.tag
						 }); 
					book.save(function (err) {
						if (err) { return next(err); }
						res.redirect(book.url);
					});
				}
                 else {
					 //author not exist, add author and book
                     author.save(function (err,added) {
						if (err) { return next(err); }
						   //successful - redirect to new author record.
						   var book = new Book({
							title: req.body.title, 
							author: added._id, 
							summary: req.body.summary,
							cover: req.body.cover,
							price: req.body.price,
							count: req.body.count,
							tag: (typeof req.body.tag==='undefined') ? [] : req.body.tag
							 }); 
					book.save(function (err) {
						if (err) { return next(err); }
						res.redirect(book.url);
					});
				});		
			}
		});
	}
};

// Display comment delete form on GET
exports.comment_delete_get = function(req, res, next) {
    var id = mongoose.Types.ObjectId(req.params.id.trim());
    async.series({
        book: function(callback) {     
            Book.findById(id)
			.populate('tag')
			.populate('author')
			.exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        res.render('book_delete', { title: 'Delete Book', book: results.book } );
    });
};

// Handle comment delete on POST
exports.comment_delete_post = function(req, res, next) {

    req.checkBody('bookid', 'Book id must exist').notEmpty();  
    
    async.series({
        book: function(callback) {     
            Book.findById(req.body.bookid).exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
		Book.findByIdAndRemove(results.book._id, function deleteBook(err) {
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
                res.redirect('/catalog/books');
            });
    });

};