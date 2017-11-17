var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/userController');


// Register User GET
router.get("/register", user_controller.user_register_get);

// Register User POST
router.post("/register", user_controller.user_register_post);

// Login User GET
router.get("/login", user_controller.user_login_get);

//Login User POST
router.post("/login", user_controller.user_login_post);

router.get("/logout", user_controller.user_logout_get);

module.exports = router;
