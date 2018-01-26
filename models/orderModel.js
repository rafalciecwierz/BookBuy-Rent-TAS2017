var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new Schema(
  {
	user: {type: Schema.ObjectId, ref: 'User', required: true},
	book: [{type: Schema.ObjectId, ref: 'Book', required: true}],
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

// do we need this?
// OrderSchema.methods.setValue = function(books,cb) { // TODO: change this to use Cart or derived values
// 	var Book = require('./bookModel');
// 	var price = 0;
// 	for(i = 0; i < books.length; i++) {
// 		books += Book.findById(books[i]._id, {'price'});	
// 	}
// };

module.exports.createOrder = function(bookIds, userId, value, callback){
	console.log("wtf"); // this is not working for me (?), so i did it in the controller - MK
	const newOrder = new Order({
		user: userId,
		book: bookIds,
		status: "awaiting payment",
		value: value
	});
	newOrder.save(callback);
};

/*OrderSchema
.virtual('url')
.get(function () {
  return '/catalog/order/' + this._id;
});*/

module.exports = mongoose.model('Order', OrderSchema);