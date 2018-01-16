


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

	this.remove = function(book, id){
		console.log(id);
		if(!this.books[id])
			return;

		if(this.books[id].qty > 1){
			this.books[id].qty--;
			this.books[id].price -= book.price;
		}
		else{
			delete this.books[id];
		}

		this.qty--;
		this.price -= book.price;
	};

	this.clear = function(){
		this.books = {}; // let's hope it works
		this.totalPrice = 0;
		this.qty = 0;
	}

}