const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/current').get(authController.protect, userController.getUser);
router.route('/signup').post(authController.signUp);
router.route('/login').post(authController.login);

router.route('/').get(userController.getAllUsers);

router.route('/:id').get(userController.getUser);

module.exports = router;

// "http-proxy-middleware": "^2.0.0",
