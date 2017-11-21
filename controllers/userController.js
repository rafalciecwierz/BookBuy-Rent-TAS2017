//var passport = require("passport");
//var LocalStrategy = require("passport-local").Strategy;
var User = require("../models/userModel");

exports.user_wishlist = function(req, res, next) {
	res.json({message: "Not implemented - user wishlist!"});
};

exports.user_cart = function(req, res, next) {
	res.json({message: "Not implemented - user cart!"});
};

// Register User
exports.user_register = function(req, res, next) {
		var newUser = new User({
			email: req.body.email,
			username: req.body.username,
			password: req.body.password
		});
		User.createUser(newUser, function(err, user){
			if(err) throw err;
			res.json(user);
		});
};
/*
passport.use(new LocalStrategy(
	function(username, password, done) {
		User.getUserByUsername(username, function(err, user){
			if(err) throw err;
			if(!user){
				return done(null, false, {message: "Unknown User"});
			}
			User.comparePassword(password, user.password, function(err, isMatch){
				if(err) throw err;
				if(isMatch){
					return done(null, user);
				} else {
					return done(null, false, {message: "Invalid password"});
				}
			});
		});
	}));

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.getUserById(id, function(err, user) {
		done(err, user);
	});
});

// Login GET
exports.user_login_get = function(req, res, next) {
	res.render("user_login", { title: "Log in"});
};

//Login POST
exports.user_login_post = function(req, res, next) {
	passport.authenticate("local", {successRedirect:"/", failureRedirect:"/users/login"}),//,failureFlash: true}),
	function(req, res) {
		console.log('success');
		res.redirect("/");
};
};

exports.user_logout_get = function(req,res,next) {
	req.logout();
	//req.flash("success_msg", "You are logged out");
	res.redirect("/users/login");
};
*/