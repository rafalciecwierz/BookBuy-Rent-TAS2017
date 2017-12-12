var User = require("../models/userModel");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;


passport.use(new LocalStrategy(	
	function(username, password, done) {
		console.log("jestem w passport");
		User.getUserByUsername(username, function(err, user){
			if(err) throw err;
			if(!user){
				console.log("nieznany user");
				return done(null, false, {message: "Unknown User"});
			}
			User.comparePassword(password, user.password, function(err, isMatch){
				if(err) throw err;
				if(isMatch){
					console.log("przeszło");
					return done(null, user);
				} else {
					console.log("złe hasło");
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

exports.user_wishlist = function(req, res, next) {
	res.json({message: "Not implemented - user wishlist!"});
};

exports.user_cart = function(req, res, next) {
	res.json({message: "Not implemented - user cart!"});
};

exports.user_list = function(req,res,next) {
	res.json({message: "Not implemented - user list!"});
};
// Register User
//var urlRegister = "http://localhost:3000/register";
exports.user_register = function(req, res, next) {
	
	req.checkBody("username", "Username field cannot be empty").notEmpty();
	req.checkBody("username", "Username must be between 4-15 characters long").len(4, 15);
	req.checkBody("email", "The email you entered is invalid, please try again").isEmail();
	req.checkBody("email", "Email must be between 4-100 characters long").len(4, 100);
	req.checkBody("password", "Password must be between 8-100 characters long").len(8, 100);
	req.checkBody("password","Password must include one lowercase character, one uppercase character, a number, and a special character").matches(/^(?=.*\d)(?=.*[a-z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
	
	
	var errors = req.validationErrors();
	if(User.getUserByUsername(req.body.username))

	if(errors){
		//		res.render("",{
		//			errors:errors
		//		});
	} else {
		var newUser = new User({
			email: req.body.email,
			username: req.body.username,
			password: req.body.password
		});
		User.createUser(newUser, function(err, user){
			if(err) throw err;
			res.json(user);
		});
	}
	
};


// Login GET
exports.user_login_get = function(req, res, next) {
	res.redirect("http://localhost:3000/");
	//res.render("user_login", { title: "Log in"});
};

//Login POST
exports.user_login_post = passport.authenticate("local", { 	
	successRedirect: "http://localhost:3000/user",
	failureRedirect: "http://localhost:3000/login"});


exports.user_logout_get = function(req,res,next) {
	req.logout();
	//req.flash("success_msg", "You are logged out");
	res.redirect("http://localhost:3000/login");
};
