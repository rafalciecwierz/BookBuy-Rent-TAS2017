var express = require('express');
var router = express.Router();

// Require controller modules
var book_controller = require('../controllers/bookController');
var author_controller = require('../controllers/authorController');
var tag_controller = require('../controllers/tagController');
var comment_controller = require('../controllers/commentController');

/// BOOK ROUTES ///

/* GET catalog home page. */
//router.get('/', book_controller.index);

/* GET request for creating a Book. NOTE This must come before routes that display Book (uses id) */
router.get('/book/create', book_controller.book_create_get);

/* POST request for creating Book. */
router.post('/book/create', book_controller.book_create_post);

/* GET request to delete Book. */
router.get('/book/:id/delete', book_controller.book_delete_get);

// POST request to delete Book
router.post('/book/:id/delete', book_controller.book_delete_post);

/* GET request to update Book. */
router.get('/book/:id/update', book_controller.book_update_get);

// POST request to update Book
router.post('/book/:id/update', book_controller.book_update_post);

/* GET request for one Book. */
router.get('/book/:id', book_controller.book_detail);

/* GET request for list of all Book items. */
router.get('/books', book_controller.book_list);

/// AUTHOR ROUTES ///

/* GET request for creating Author. NOTE This must come before route for id (i.e. display author) */
router.get('/author/create', author_controller.author_create_get);

/* POST request for creating Author. */
router.post('/author/create', author_controller.author_create_post);

/* GET request to delete Author. */
router.get('/author/:id/delete', author_controller.author_delete_get);

// POST request to delete Author
router.post('/author/:id/delete', author_controller.author_delete_post);

/* GET request to update Author. */
router.get('/author/:id/update', author_controller.author_update_get);

// POST request to update Author
router.post('/author/:id/update', author_controller.author_update_post);

/* GET request for one Author. */
router.get('/author/:id', author_controller.author_detail);

/* GET request for list of all Authors. */
router.get('/authors', author_controller.author_list);

/// TAG ROUTES ///

/* GET request for creating a Tag. NOTE This must come before route that displays Tag (uses id) */
router.get('/tag/create', tag_controller.tag_create_get);

/* POST request for creating Tag. */
router.post('/tag/create', tag_controller.tag_create_post);

/* GET request to delete Tag. */
router.get('/tag/:id/delete', tag_controller.tag_delete_get);

// POST request to delete Tag
router.post('/tag/:id/delete', tag_controller.tag_delete_post);

/* GET request to update Tag. */
router.get('/tag/:id/update', tag_controller.tag_update_get);

// POST request to update Tag
router.post('/tag/:id/update', tag_controller.tag_update_post);

/* GET request for one Tag. */
router.get('/tag/:id', tag_controller.tag_detail);

/* GET request for list of all Tag. */
router.get('/tags', tag_controller.tag_list);

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