var mongoose = require("mongoose");
var Schema = mongoose.Schema;


// Comment Schema
var CommentSchema = mongoose.Schema({
	user: {type: Schema.ObjectId, ref: 'User', required: true},
	book: {type: Schema.ObjectId, ref: 'Book', required: true},
	mark: {type: Number, min: 0, max: 5,required: true},
	//komentarz opcjonalny?????
	comment: {type: String, required: true}
});

CommentSchema.query.byUserId = function(userId) {
	return this.find({ user: userId });
};

CommentSchema.query.byBookId = function(bookId) {
	return this.find({ book: bookId });
};

CommentSchema
.virtual('url')
.get(function () {
  return '/catalog/comment/' + this._id;
});

module.exports = mongoose.model('Comment', CommentSchema);