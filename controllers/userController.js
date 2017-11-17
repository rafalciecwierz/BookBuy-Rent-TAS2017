var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var User = require("../models/userModel");

// Register
exports.user_register_get = function(req, res, next) {
	res.render("user_register", {title: "Register"});
};

// Register User
exports.user_register_post = function(req, res, next) {
	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;


	// Walidacja
	req.checkBody("name", "Name is required").notEmpty();
	req.checkBody("email", "Email is required").notEmpty();
	req.checkBody("email", "Email is not valid").isEmail();
	req.checkBody("username", "Username is required").notEmpty();
	req.checkBody("password", "Password is required").notEmpty();
	req.checkBody("password2", "Passwords do not match").equals(req.body.password);
	
	var user = ({
			name: name,
			email: email,
			username: username
		});
	var errors = req.validationErrors();

	if(errors){
		res.render("user_register",{
			title: "Register", errors:errors, user: user
		});
	} else {
		var newUser = new User({
			name: name,
			email: email,
			username: username,
			password: password
		});
		User.createUser(newUser, function(err, user){
			if(err) throw err;
			console.log(user);
		});

		//req.flash("success_msg", "You are registered and can now login");

		res.redirect("/users/login");
	}
};

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