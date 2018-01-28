var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require("mongoose-mongodb-errors");
const passportLocalMongoose = require("passport-local-mongoose");
// User Schema

var UserSchema = new Schema({
	username: {
		type: String,
		required: "Please supply a name",
		trim: true
	},
	email: {
		type: String,
		unique: true,
		lowercase: true,
		trim: true,
		required: "Please Supply an email address"
	},
	wishlist: [{type: Schema.ObjectId, ref: "Book"}],
	bought: [{type: Schema.ObjectId, ref: "Book"}]
});
UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
UserSchema.plugin(mongodbErrorHandler);
var User = module.exports = mongoose.model("User", UserSchema);

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
		bcrypt.hash(newUser.password, salt, function(err, hash) {
			newUser.password = hash;
			newUser.save(callback);
		});
	});
};



module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
};

module.exports.getUserByEmail = function(email, callback){
	var query = {email: email};
	User.findOne(query,callback);
};

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
};

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
		if(err) throw err;
		callback(null, isMatch);
	});
};

module.exports.addBoughtBooks = function(id, bookIds, callback){
	User.findOne({'_id': id}, (err, data) => {
		if(err) console.log(err);
		data.bought = data.bought.concat(bookIds);
		User.findOneAndUpdate({'_id': id}, data, callback);
	})
};