const express = require('express');
const router = express.Router();
const shoeController = require('../controllers/shoe.controller');

router.get('/', shoeController.getShoes);
router.get('/:id', shoeController.getShoeById);

module.exports = router;