var express = require('express');
var router = express.Router();
var Book = require('../models/bookModel');
var Author = require('../models/authorModel');
var Tag = require('../models/tagModel');
var User = require('../models/userModel');
var mongoose = require('mongoose');
var async = require('async');

router.get("/", function(req, res){
	async.parallel({
        book_count: function(callback) {
            Book.count(callback);
        },
        author_count: function(callback) {
            Author.count(callback);
        },
        tag_count: function(callback) {
            Tag.count(callback);
		},
		user_count: function(callback) {
			User.count(callback);
        },
    }, function(err, results) {
        res.render('index', { title: 'Ebooking Home', error: err, data: results });
    });
});

router.get("/", ensureAuthenticated, function(req, res){
	res.render("index");
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect("/users/login");
	}
}

module.exports = router;
