var express = require('express');
var router = express.Router();

// Require controller modules
var book_controller = require('../controllers/bookController');
var author_controller = require('../controllers/authorController');
var tag_controller = require('../controllers/tagController');
var comment_controller = require('../controllers/commentController');
var action_controller = require('../controllers/actionController');
var user_controller = require('../controllers/userController');
var multer = require('multer');

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
router.get('/books', book_controller.book_list);

/* request for one Book. */
router.get('/books/:id', book_controller.book_detail);

/* creating Book. */
router.post('/books', upload, book_controller.book_create);

// delete Book
router.delete('/books/:id', book_controller.book_delete);

// update Book
router.put('/books/:id', upload, book_controller.book_update);

//get cover
router.get('/books/cover/:name', book_controller.book_cover);


/// AUTHOR ROUTES ///

/* request for list of all Authors. */
router.get('/authors', author_controller.author_list);

/* request for one Author and books. */
router.get('/authors/:id', author_controller.author_detail);

/* creating Author. */
router.post('/authors', author_controller.author_create);

/* delete Author. */
router.delete('/authors/:id', author_controller.author_delete);

// update Author //
router.put('/authors/:id', author_controller.author_update);


/// TAG ROUTES ///

/* GET Tag and books. */
router.get('/tags/:id', tag_controller.tag_detail);

/* GET request for list of all Tag. */
router.get('/tags', tag_controller.tag_list);

/* creating Tag. */
router.post('/tags', tag_controller.tag_create);

/* delete Tag. */
router.delete('/tags/:id', tag_controller.tag_delete);

// update Tag
router.put('/tags/:id', tag_controller.tag_update);

/// COMMENT ROUTES ///

/* POST request for creating Comment. */
router.post('/books/:id/comments', comment_controller.comment_create);

/* get book Comments. */
router.get('/books/:id/comments', comment_controller.comment_detail);

/* delete Comment. */
router.delete('/comments/:id', comment_controller.comment_delete);

/* update Comment. */
router.put('/comments/:id', comment_controller.comment_update);

/// ACTION ROUTES ///

// SEARCH book/author/tag //
router.post('/search',action_controller.search);

// Add Book to User wishlist //
/* NOT WORKING */
router.post('/books/:id/wishlist',action_controller.addToWishlist);

//Add Book to User cart //
/* NOT WORKING */
router.post('/books/:id/cart',action_controller.addToCart);

//Get books bought by User //
/* NOT WORKING */
router.get('/users/:id/bought',action_controller.user_books);

/// USER ROUTES ///

// Register User //
router.post("/users", user_controller.user_register);

//GET Users
router.get("/users",user_controller.user_list);

// GET User wishlist //
/* NOT WORKING */
router.get("/users/wishlist",user_controller.user_wishlist);

//GET User cart //
/* NOT WORKING */
router.get("/users/cart",user_controller.user_cart);

/*
// Login User GET
router.get("/login", user_controller.user_login_get);

//Login User POST
router.post("/login", user_controller.user_login_post);

router.get("/logout", user_controller.user_logout_get);
*/

module.exports = router;