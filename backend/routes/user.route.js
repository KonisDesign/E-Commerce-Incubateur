const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.post('/signup', userController.createUser);
router.post('/signin', userController.loginUser);
router.get('/profile/:id', userController.getUserById);
router.post('/order/:id', userController.createOrder);

module.exports = router;