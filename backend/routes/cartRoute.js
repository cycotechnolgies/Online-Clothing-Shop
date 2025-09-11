const express = require('express');
const router = express.Router();
const cartController = require('../controller/cartController');

// POST /api/cart - Route to add or update an item in the user's cart
router.post('/', cartController.addItemToCart);

module.exports = router;