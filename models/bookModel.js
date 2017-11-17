var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema({
  title: {type: String, required: true},
  //zdjecie okladki????????
  cover: {type: String, default: null},
  author: {type: Schema.ObjectId, ref: 'Author', required: true},
  summary: {type: String, default: null},
  price: {type: Number, required: true},
  tag: [{type: Schema.ObjectId, ref: 'Tag', required: true}],
  likes : {type: Number, default: 0},
  count: {type: Number, required: true} 
});

BookSchema
.virtual('url')
.get(function () {
  return '/catalog/book/' + this._id;
});

module.exports.addLike = function(bookId,cb) {
  return this.model('Book').findOneAdUpdate({ _id: bookId },{$set: { likes: likes +1 }}, cb);
};

BookSchema.query.byTitle = function(title,cb) {
	return this.find({ title: title },cb);
};

BookSchema.query.byAuthorId = function(author,cb) {
	return this.find({ author: author },cb);
};

BookSchema.query.byTagId = function(tag) {
	return this.find({ tag: tag });
};


module.exports = mongoose.model('Book', BookSchema);