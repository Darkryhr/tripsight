const express = require('express');
const vacationsController = require('../controllers/vacationsController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(authController.protect, vacationsController.getAllVacations)
  .post(vacationsController.createVacation);

router
  .route('/:id')
  .get(vacationsController.getVacation)
  .patch(vacationsController.updateVacation)
  .delete(
    authController.protect,
    // restricts to admin role, stored as BIT(0, 1)
    authController.restrictTo(1),
    vacationsController.deleteVacation
  );

module.exports = router;
