

exports.logout = (req, res) => {
	req.logout();
	req.flash("success", "You are now logged out!");
	res.json({redirectURL:"/"});
};

exports.isLoggedIn = (req, res, next) => {
	
	if (req.isAuthenticated()) {
		next(); 
		return;
	}
	req.flash("error", "Oops you must be logged in to do that!");
	res.json({redirectURL:"/login"});
};