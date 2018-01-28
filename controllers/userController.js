
const User = require("../models/userModel");
var Book = require("../models/bookModel");
const promisify = require('es6-promisify');
const mongoose = require("mongoose");

exports.user_wishlist = function(req, res, next) {
	userId = req.session.userId;
	//var tmp = results.authors.map(function (obj){ return mongoose.Types.ObjectId(obj._id)});
	User.findById(userId, 'wishlist')
	.exec(function(err,found_user){
			if(err) {return next(err);}
			console.log(found_user);
			if(found_user){
				Book.find({_id: {$in: found_user.wishlist}})
				.populate('author')
				.populate('tag')
				.exec(function(err,found_books){
					if(err) {return next(err);}
					console.log('wishlist');
					console.log(found_books);
					res.json(found_books);
				});
			}
		});
	//res.json({message: "Not implemented - user wishlist!"});
};

exports.user_cart = function(req, res, next) {
	res.json({message: "Not implemented - user cart!"});
};

//bought books
exports.user_books = function(req, res, next) {
	userId = req.session.userId;
	User.findById(userId, 'bought')
	.exec(function(err,found_user){
			if(err) {return next(err);}
			if(found_user){
				Book.find({_id: {$in: found_user.bought}})
				.populate('author')
				.populate('tag')
				.exec(function(err,found_books){
					if(err) {return next(err);}
					console.log('bought');
					res.json(found_books);
				});
			}
		});
};

exports.user_data = function(req,res,next) {
	userId = req.session.userId;
	User.findById(userId, 'username _id email')
	.exec(function(err,found_user){
		if(err) {return next(err);}
		console.log('user');
		console.log(found_user);
		res.json(found_user);
	});
	//res.json({message: "Not implemented - user list!"});
};

exports.validateRegister = (req, res, next) => {
	console.log(req.body);
	req.sanitizeBody('username');
	console.log(req.body.username);
	req.checkBody('username', 'You must supply a name!').notEmpty();
	req.checkBody('email', 'That Email is not valid!').isEmail();
	req.sanitizeBody('email').normalizeEmail({
	  gmail_remove_dots: false,
	  remove_extension: false,
	  gmail_remove_subaddress: false
	});
	req.checkBody('password', 'Password Cannot be Blank!').notEmpty();

	const errors = req.validationErrors();
	console.log(errors);
	if (errors) {
	  req.flash('error', errors.map(err => err.msg));
	  res.json({body: req.body, flashes: req.flash() });
	  return; // stop the fn from running
	}
	next(); // there were no errors!
  };

  exports.register = async (req, res, next) => {
	const user = new User({username: req.body.username, email: req.body.email });
	console.log(user);
	const register = promisify(User.register, User);
	console.log(register.name);
	await register(user, req.body.password);
	next(); // pass to authController.login
  };

// Login GET
exports.user_login_get = function(req, res, next) {

};

//Login POST
exports.user_login_post = function(req , res, next){
};


exports.user_logout_get = function(req,res,next) {
	
};

exports.addBoughtBooks = function(req, res, next){
	User.addBoughtBooks(req.body.id, req.body.bookIds, (err, data) => {
		if(err) console.log(err);
		res.json({message: "Ok."})
	})
};
