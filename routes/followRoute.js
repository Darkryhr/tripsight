const express = require('express');
const followsController = require('../controllers/followsController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/all')
  .get(authController.protect, followsController.getAllFollows);
router
  .route('/:id')
  .get(authController.protect, followsController.followVacation)
  .delete(authController.protect, followsController.removeVacation);

router.route('/').get(authController.protect, followsController.getFollowed);

module.exports = router;
