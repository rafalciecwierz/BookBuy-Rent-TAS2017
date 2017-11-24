var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new Schema(
  {
	user: {type: Schema.ObjectId, ref: 'User', required: true},
	book: [{type: Schema.ObjectId, ref: 'Book', required: true)],
	status: {type: String, enum: ["awaiting payment","accepted","completed"], required: true},
	//jak obliczac?
	value: {type: Number, default: 0}
  }
);

OrderSchema.query.byUserId = function(userId) {
	return this.find({ user: userId });
};

OrderSchema.query.byBookId = function(bookId) {
	return this.find({ book: bookId });
};

OrderSchema.methods.setValue = function(books,cb) {
	var Book = require('./bookModel');
	var price = 0;
	for(i = 0; i < books.length; i++) {
		books += Book.findById(books[i]._id, {'price'});	
	}
};

module.exports.createOrder = function(newOrder, callback){
	var Book = require('./bookModel');
	var price = 0;
	for(i = 0; i < newOrder.book.length; i++) {
		price += Book.findById(books[i]._id, {'price'});	
	}
	newOrder.value = price;
	newOrder.save(callback);
	});
}

/*OrderSchema
.virtual('url')
.get(function () {
  return '/catalog/order/' + this._id;
});*/

module.exports = mongoose.model('Order', OrderSchema);