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
      res.render('author_list', { title: 'Author List', author_list: list_authors });
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
    res.render('author_detail', { title: 'Author Detail', author: results.author, author_books: results.authors_books });
  });
    
};

// Display Author create form on GET
exports.author_create_get = function(req, res, next) {       
    res.render('author_form', { title: 'Create Author'});
};

// Handle Author create on POST
exports.author_create_post = function(req, res) {
	req.checkBody('first_name', 'First name must be specified.').notEmpty();
    req.checkBody('family_name', 'Family name must be specified.').notEmpty();
    req.checkBody('family_name', 'Family name must be alphanumeric text.').isAlpha();
    
    req.sanitize('first_name').escape();
    req.sanitize('family_name').escape();
    req.sanitize('first_name').trim();     
    req.sanitize('family_name').trim();

    var errors = req.validationErrors();
    
    var author = new Author(
      { first_name: req.body.first_name, 
        family_name: req.body.family_name
       });
       
    if (errors) {
        res.render('author_form', { title: 'Create Author', author: author, errors: errors});
    return;
    } 
	else {
		console.log(errors);
		Author.findOne({ 'first_name': req.body.first_name, 'family_name': req.body.family_name })
			.exec( function(err, found_author) {
				 console.log('found_author: ' + found_author);
				 if (err) { return next(err); }
				 
				 if (found_author) { 
					 var error = [{"msg":"Author already exists"}];
					 res.render('author_form', { title: 'Create Author',author : author, errors: error});
				 }
				 else {
					 
					 author.save(function (err) {
						if (err) { return next(err); }
						   res.redirect(author.url);
						});
				 } 
			 });
    }
};

// Display Author delete form on GET
exports.author_delete_get = function(req, res, next) {    
	var id = mongoose.Types.ObjectId(req.params.id.trim());   
    async.parallel({
        author: function(callback) {     
            Author.findById(id).exec(callback);
        },
        authors_books: function(callback) {
          Book.find({ 'author': id }).exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        res.render('author_delete', { title: 'Delete Author', author: results.author, author_books: results.authors_books } );
    });
};

// Handle Author delete on POST
exports.author_delete_post = function(req, res, next) {

    req.checkBody('authorid', 'Author id must exist').notEmpty();  
    async.parallel({
        author: function(callback) {     
            Author.findById(req.body.authorid).exec(callback);
        },
        authors_books: function(callback) {
          Book.find({ 'author': req.body.authorid },'title summary').exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.authors_books.length > 0) {
			for (i = 0; i < results.authors_books.length; i++) {
                Book.findByIdAndRemove(results.authors_books[i]._id, function deleteBook(err) {
				if(err) {return next(err);} });
                }
			Author.findByIdAndRemove(req.body.authorid, function deleteAuthor(err) {
                if (err) { return next(err); }
                res.redirect('/catalog/authors');
            });
        }
        else {
            Author.findByIdAndRemove(req.body.authorid, function deleteAuthor(err) {
                if (err) { return next(err); }
                res.redirect('/catalog/authors');
            });

        }
    });

};

// Display Author update form on GET
exports.author_update_get = function(req, res, next) {
    
    req.sanitize('id').escape();
    req.sanitize('id').trim();
    Author.findById(req.params.id, function(err, author) {
        if (err) { return next(err); }
        res.render('author_form', { title: 'Update Author', author: author });
    });
};

// Handle Author update on POST
exports.author_update_post = function(req, res, next) {
    
    req.sanitize('id').escape();
    req.sanitize('id').trim();

    req.checkBody('first_name', 'First name must be specified.').notEmpty();
    req.checkBody('family_name', 'Family name must be specified.').notEmpty();
    req.checkBody('family_name', 'Family name must be alphanumeric text.').isAlpha();
    req.sanitize('first_name').escape();
    req.sanitize('family_name').escape();
    req.sanitize('first_name').trim();
    req.sanitize('family_name').trim();

    var errors = req.validationErrors();

    var author = new Author(
      {
      first_name: req.body.first_name,
      family_name: req.body.family_name,
      _id: req.params.id
      }
    );

    if (errors) {
        console.log(errors);
        res.render('author_form', { title: 'Update Author', author: author, errors: errors});
    return;
    }
    else {
        Author.findByIdAndUpdate(req.params.id, author, {}, function (err,theauthor) {
            if (err) { return next(err); }
               res.redirect(theauthor.url);
            });
    }
};