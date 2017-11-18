var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var BookSchema = new Schema({
	title: {type: String, required: true},
	//zdjecie okladki????????
	cover: {type: String, default: null},
	author: {type: Schema.ObjectId, ref: "Author", required: true},
	summary: {type: String, default: null},
	price: {type: Number, required: true},
	tag: [{type: Schema.ObjectId, ref: "Tag", required: true}],
	likes : {type: Number, default: 0},
	count: {type: Number, required: true} 
});


var Book = module.exports = mongoose.model("Book", BookSchema);

module.exports.addLike = function(bookId,cb) {
	return this.model("Book").findOneAdUpdate({ _id: bookId },{$set: { likes: Book.likes +1 }}, cb);
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
module.exports.getBooks = function(callback, limit)  {
	Book.find(callback).limit(limit);
};

// Get Book
module.exports.getBookById = function(id, callback) {
	Book.findById(id, callback);
};

// Add Book
module.exports.addBook = function(book, callback) {
	Book.create(book, callback);
};

// Update Book
module.exports.updateBook = function(id, book, options, callback) {
	var query = {_id: id};
	var update = {
		title: Book.title,
		//zdjecie okladki????????
		cover: Book.cover, 
		author: Book.author,
		summary: Book.summary,
		price: Book.price,
		tag: Book.tag, 
		likes: Book.likes,
		count: Book.count
	};
	Book.findOneAndUpdate(query, update, options, callback);
};

// Delete Book
module.exports.removeBook = function(id, callback){
	var query = {_id: id};
	Book.remove(query, callback);
};


module.exports = mongoose.model("Book", BookSchema);