var express = require("express");
var router = express.Router();
var passport = require("passport");
// Require controller modules
const auth_controller = require("../controllers/authenticationController");
var book_controller = require("../controllers/bookController");
var author_controller = require("../controllers/authorController");
var tag_controller = require("../controllers/tagController");
var comment_controller = require("../controllers/commentController");
var action_controller = require("../controllers/actionController");
var user_controller = require("../controllers/userController");
var order_controller = require("../controllers/orderController");

var multer = require("multer");
var Storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, "./src/assets/img/books");
	},
	filename: function(req, file, callback) {
		callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
	}
});

var upload = multer({
	storage: Storage
}).single("file");

/// BOOK ROUTES ///

/* request for list of all Book items. */
router.get("/books", book_controller.book_list);

/* request for one Book. */
router.get("/books/:id", book_controller.book_detail);

/* creating Book. */
router.post("/books", upload, book_controller.book_create);

// delete Book
router.delete("/books/:id", book_controller.book_delete);

// update Book
router.put("/books/:id", upload, book_controller.book_update);

//get cover
router.get("/books/cover/:name", book_controller.book_cover);


/// AUTHOR ROUTES ///

/* request for list of all Authors. */
router.get("/authors", author_controller.author_list);

/* request for one Author and books. */
router.get("/authors/:id", author_controller.author_detail);

/* creating Author. */
router.post("/authors", author_controller.author_create);

/* delete Author. */
router.delete("/authors/:id", author_controller.author_delete);

// update Author //
router.put("/authors/:id", author_controller.author_update);


/// TAG ROUTES ///

/* GET Tag and books. */
router.get("/tags/:id", tag_controller.tag_detail);

/* GET request for list of all Tag. */
router.get("/tags", tag_controller.tag_list);

/* creating Tag. */
router.post("/tags", tag_controller.tag_create);

/* delete Tag. */
router.delete("/tags/:id", tag_controller.tag_delete);

// update Tag
router.put("/tags/:id", tag_controller.tag_update);

/// COMMENT ROUTES ///

/* POST request for creating Comment. */
router.post("/books/:id/comments", comment_controller.comment_create);

/* get book Comments. */
router.get("/books/:id/comments", comment_controller.comment_detail);

/* delete Comment. */
router.delete("/comments/:id", comment_controller.comment_delete);

/* update Comment. */
router.put("/comments/:id", comment_controller.comment_update);

/// ACTION ROUTES ///

// SEARCH book/author/tag //
router.post("/search",action_controller.search);

// Add Book to User wishlist //
router.post("/books/:id/wishlist",auth_controller.isLoggedIn, action_controller.addToWishlist);


/// ORDER ROUTES ///


// Add Book to cart //
router.post("/orders/:id/cart/add", order_controller.addToCart);

// Delete book from cart //
router.post("/orders/:id/cart_del",  order_controller.deleteFromCart);

// Get  cart //
router.get("/orders/cart_get",  order_controller.getCart);

// Empty (delete) cart //
router.post("/orders/cart/del",  order_controller.emptyCart);

// Create order //
router.post("/orders/create_order", auth_controller.isLoggedIn, order_controller.createOrder);

// Get user orders //
router.get("/orders/user_orders", auth_controller.isLoggedIn, order_controller.getUserOrders);

// Get all orders with given status (lol)//
// TODO: change isLoggedIn to isAdmin
router.get("/orders/status", auth_controller.isLoggedIn, order_controller.getAllOrders);

// Get order's details // add user_id checking!
router.get("/orders/details", auth_controller.isLoggedIn, order_controller.getOrderDetails);

// Remove order // add isAdmin checking!
router.post("/orders/remove", auth_controller.isLoggedIn, order_controller.removeOrder);

// Change state of an order //
router.post("/orders/change_state", auth_controller.isLoggedIn, order_controller.changeOrder);
// TODO: define req (changeStatus up or to req.data.status?)

/// USER ROUTES ///


// Register User //
router.post("/users",
	user_controller.validateRegister,
	user_controller.register,
	passport.authenticate("local"),
	(req,res)=>{
		console.log(res);
		res.json(
			{redirectURL:"/"
			});
	}
);

//GET User
router.get("/users",auth_controller.isLoggedIn,user_controller.user_data);

// Add books to bought list //
router.post("/users/add_bought",auth_controller.isLoggedIn, user_controller.addBoughtBooks);

// Add books to bought list //
router.post("/users/add_bought",auth_controller.isLoggedIn, user_controller.addBoughtBooks);

// GET User wishlist //
router.get("/users/wishlist",auth_controller.isLoggedIn, user_controller.user_wishlist);

//Get books bought by User //
router.get("/users/bought", auth_controller.isLoggedIn,user_controller.user_books);

// Login User GET
router.get("/login", user_controller.user_login_get);

//Login User POST
router.post("/login", passport.authenticate("local", {session: true}),
	(req,res)=>{
		// console.log('\n\n id \n\n\n', req.user._id);
		// console.log('\n\n uname \n\n', req.user.username);
		req.session.userId = req.user._id; // add to session to use it easier
		res.json(
			{redirectURL:"/user",
			userId: req.user._id,
			userName: req.user.username
			});
	}
);

router.get("/logout", auth_controller.logout);

module.exports = router;
