const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/products', shopController.getProducts);

router.post('/products', shopController.postProducts);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

module.exports = router;