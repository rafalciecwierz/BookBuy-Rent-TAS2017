var Cart = require('../models/cartModel');
var Order = require('../models/orderModel');
var User = require('../models/userModel');
var Book = require('../models/bookModel');

exports.addToCart = function(req, res, next) {
	console.log('Adding to cart.');
	var bookId = req.body.bookId;
	console.log('bookId', bookId);
	var cart = new Cart(req.session.cart || {});
	Book.findById(bookId, function(err, book) {
		if(err){
			console.log("\n Book doesn't exist. \n");
			res.json({message: "Couldn't find the book."});
		}
		cart.add(book, bookId);
		req.session.cart = cart; 
		req.session.save();
		res.json({
            message: "Added to cart.", 
            totalQty: cart.qty, 
            totalPrice: cart.totalPrice
        });
	});
};

exports.deleteFromCart = function(req, res, next){
	console.log("Deleting form cart");
	var bookId = req.body.bookId;
	console.log('bookId', bookId);
	var cart = new Cart(req.session.cart || {});
	cart.remove(bookId);
	req.session.cart = cart;
	res.json({mesage: "Deleted successfully."})
	// console.log(cart);
};

exports.getCart = function(req, res, next){
	console.log("Getting from cart");
	var cart = new Cart(req.session.cart || {});
	var formattedCart = cart.getCart();
	// console.log("data from cart ", formatedCart);
	// we could find names of the aothors of books here, but that would last some time
	res.json({
		bookIds: formattedCart.bookIds,
		books: formattedCart.books,
		totalPrice: formattedCart.totalPrice,
		totalQty: formattedCart.qty
	});
};

exports.emptyCart = function(req, res, next){ // empties the cart
	console.log("Emptying cart")
	req.session.cart = new Cart({}); // i hope it will work and gc will take care of it
	res.json({message: "Cart is empty."})
};

exports.createOrder = function(req, res, next){ 
	console.log('Creating order.');
	var cart = new Cart(req.session.cart || {});
	// console.log(cart);
	let data = cart.getCart();
	let userId = req.session.userId;
	let qties = data.books.map(book => book.qty);
	console.log('qties', qties);
	const newOrder = Order({
		user: userId,
		book: data.bookIds,
		qties: qties,
		status: 'awaiting payment',
		value: data.totalPrice
	});
	newOrder.save(function(err, saved){
		res.json({message: "Order created successfully!"});
	})
};


///// operations not involving cart /////

exports.getUserOrders = function(req, res, next){
	console.log("Getting user orders.");
	let userId = req.session.userId;
	Order.find({user: userId}, (err, data) => {
        if(err) console.log(err);
        console.log(data);
        res.json({orders: data});
    });
}

exports.getOrderDetails = function(req, res, next){
	console.log('Getting order details.');
	let orderId = req.query.orderId;
	Order.findOne({'_id': orderId})
	.populate('user')
	.populate('book')
	.exec((err, data) => {
		let arr = [];
		for(let i = 0; i < data.book.length && i < data.qties.length; i++){
			arr.push({book: data.book[i], qty: data.qties[i]});
		}
		res.json({order: data, details: arr});
	})
}

exports.getAllOrders = function(req, res, next){
	console.log("Getting " + req.query.status + " orders");
	Order.find ({status: req.query.status})
	.populate('user')
	// .populate('book') // to można sobie zostawić na potem
	.exec((err, data) => {
		if(err) console.log(err);
		res.json({orders: data});
	})
}

exports.changeOrder = function(req, res, next){
	console.log("updating");
	console.log(req.body.id, req.body.status);
    Order.update({"_id": req.body.id}, {status: req.body.status}, (err, raw) => {
    	if(err) console.log(err);
		res.json({message: "State changed."});
    });
};


exports.removeOrder = function(req, res, next){
	console.log('removing!');
	console.log('order id to remove: ' + req.body.id);
	Order.find({"_id": req.body.id})
	.remove((err, stuff) => {
		if(err) {console.log(err);}
		else{
			console.log("removed");
			res.json({message: "Removed succesfully!"});
		}
	})
}