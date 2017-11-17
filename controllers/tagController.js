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
      res.render('tag_list', { title: 'Tag List', tag_list: list_tags });
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
    res.render('tag_detail', { title: 'Tag Detail', tag: results.tag, tag_books: results.tag_books } );
  });
};

// Display Tag create form on GET
exports.tag_create_get = function(req, res, next) {       
    res.render('tag_form', { title: 'Create Tag' });
};

// Handle Tag create on POST
exports.tag_create_post = function(req, res,next) {

    req.checkBody('name', 'Tag name required').notEmpty(); 
    req.sanitize('name').escape();
    req.sanitize('name').trim();
    
    var errors = req.validationErrors();

    var tag = new Tag(
      { name: req.body.name }
    );
    
    if (errors) {
		console.log(errors);
        res.render('tag_form', { title: 'Create Tag', tag: tag, errors: errors});
    return;
    } 
    else {
        Tag.findOne({ 'name': req.body.name })
            .exec( function(err, found_tag) {
                 console.log('found_tag: ' + found_tag);
                 if (err) { return next(err); }
                 
                 if (found_tag) { 
					 var error = [{"msg":"Tag already exists"}];
					 res.render('tag_form', { title: 'Create Tag', tag: tag, errors: error});
                 }
                 else {
                     
                     tag.save(function (err) {
                       if (err) { return next(err); }
                       res.redirect(tag.url);
                     });
                     
                 }
                 
             });
    }

};

// Display Tag delete form on GET
exports.tag_delete_get = function(req, res, next) {
    var id = mongoose.Types.ObjectId(req.params.id.trim());
    async.series({
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
        res.render('tag_delete', { title: 'Delete Tag', tag: results.tag, tag_books: results.tag_books } );
    });
};

// Handle Tag delete on POST
exports.tag_delete_post = function(req, res, next) {
    
    req.checkBody('tagid', 'Tag id must exist').notEmpty();  
    
    async.series({
        tag: function(callback) {     
            Tag.findById(req.body.tagid).exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
		Tag.findByIdAndRemove(results.tag._id, function deleteTag(err) {
                if (err) { return next(err); }
                res.redirect('/catalog/tags');
            });
    });

};

// Display Tag update form on GET
exports.tag_update_get = function(req, res, next) {
	var id = mongoose.Types.ObjectId(req.params.id.trim());
    async.parallel({
        tag: function(callback) {
            Tag.findById(id)
			.exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        res.render('tag_form', { title: 'Update Tag', tag:results.tag});
    });
};

// Handle Tag update on POST
exports.tag_update_post = function(req, res, next) {
    
	req.sanitize('id').escape();
    req.sanitize('id').trim();
	
    req.checkBody('name', 'Tag name required').notEmpty(); 
    req.sanitize('name').escape();
    req.sanitize('name').trim();
	
    var errors = req.validationErrors();

    var tag = new Tag(
      { name: req.body.name,
	  _id: req.params.id}
    );
    
    if (errors) {
        console.log(errors);
        res.render('tag_form', { title: 'Create Tag', tag: tag, errors: errors});
    return;
    } 
    else {
		 Tag.findByIdAndUpdate(req.params.id, tag, {}, function (err,thetag) {
			if (err) { return next(err); }
			res.redirect(thetag.url);
		 });
    }
};