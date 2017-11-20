var express = require('express');
var router = express.Router();

// Require controller modules
var book_controller = require('../controllers/bookController');
var author_controller = require('../controllers/authorController');
var tag_controller = require('../controllers/tagController');
var comment_controller = require('../controllers/commentController');
var search_controller = require('../controllers/search');

/// BOOK ROUTES ///

/* request for list of all Book items. */
router.get('/books', book_controller.book_list);

/* request for one Book. */
router.get('/books/:id', book_controller.book_detail);

/* creating Book. */
router.post('/books', book_controller.book_create);

// delete Book
router.delete('/books/:id', book_controller.book_delete);

// update Book
router.put('/books/:id', book_controller.book_update);


/// AUTHOR ROUTES ///

/* request for list of all Authors. */
router.get('/authors', author_controller.author_list);

/* request for one Author. */
router.get('/authors/:id', author_controller.author_detail);

/* creating Author. */
router.post('/authors', author_controller.author_create);

/* delete Author. */
router.delete('/authors/:id', author_controller.author_delete);

// update Author
router.put('/authors/:id', author_controller.author_update);


/// TAG ROUTES ///

/* GET request for one Tag. */
router.get('/tags/:id', tag_controller.tag_detail);

/* GET request for list of all Tag. */
router.get('/tags', tag_controller.tag_list);

/* creating Tag. */
router.post('/tags', tag_controller.tag_create);

/* delete Tag. */
router.delete('/tags/:id', tag_controller.tag_delete);

// update Tag
router.put('/tags/:id', tag_controller.tag_update);

/// SEARCH ///

router.post('/search',search_controller.search);

/// COMMENT ROUTES ///

/* GET request for creating a Comment. NOTE This must come before routes that display Comment (uses id) */
router.get('/book/:id/comment/create', comment_controller.comment_create_get);

/* POST request for creating Comment. */
router.post('/book/:id/comment/create', comment_controller.comment_create_post);

/* GET request to delete Comment. */
router.get('/comment/:id/delete', comment_controller.comment_delete_get);

// POST request to delete Comment
router.post('/comment/:id/delete', comment_controller.comment_delete_post);

/* GET request for one Comment. */
router.get('/comment/:id', comment_controller.comment_detail);

module.exports = router;