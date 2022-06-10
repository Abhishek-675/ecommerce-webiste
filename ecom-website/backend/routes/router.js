const express = require('express');

const controller = require('../controllers/controller');

const router = express.Router();

router.get('/products', controller.getProducts);

router.post('/products', controller.addProduct);

router.get('/cart', controller.getCart);

router.post('/cart', controller.addToCart);


module.exports = router;