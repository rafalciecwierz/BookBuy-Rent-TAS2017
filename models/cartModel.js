

/// this module won't be used in database ///


module.exports = function Cart(old){ 
	this.books = old.books || {};
	this.totalPrice = old.totalPrice || 0;
	this.qty = old.qty || 0;

	this.add = function(book, id){
		console.log(id)
		var newBook = this.books[id];
		if(!newBook){
			newBook = this.books[id] = {book: book, qty: 0, price: 0}
		}
		this.books[id].qty++;
		this.books[id].price += book.price;

		this.qty++;
		this.totalPrice += book.price;
	};

	this.remove = function(id){
		if(!(id in this.books))
			return;

		this.qty--;
		this.totalPrice -= this.books[id].book.price;

		if(this.books[id].qty > 1){
			this.books[id].qty--;
			this.books[id].price -= this.books[id].book.price;
		} else{
			delete this.books[id];
		}
	};

	this.empty = function(){
		this.books = {}; // let's hope it works
		this.totalPrice = 0;
		this.qty = 0;
	};

	this.getCart = function(){ // returns total value, qty; and array of {book, qty, price}
		var arr = [];
		for (let id in this.books){
			arr.push(this.books[id]);
		}
		return {
			bookIds: Object.keys(this.books),
			books: arr,
			totalPrice: this.totalPrice,
			qty: this.qty
		};
	}

}