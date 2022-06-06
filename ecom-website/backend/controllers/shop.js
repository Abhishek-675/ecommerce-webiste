const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
    Product.findAll()
        .then(products => {
            res.json(products);
        })
        .catch(err => console.log(err));
};

exports.postProducts = (req, res, next) => {
    const imageUrl = req.body.imageUrl;
    const title = req.body.title;
    const price = req.body.price;
    Product.create({
        imageUrl: imageUrl,
        title: title,
        price: price
    })
    .then(() => {
        res.status(201).send({
            data: 'product added'
        })
    })
    .catch(err => console.log(err));
}

exports.getCart = (req, res, next) => {
    Cart.findAll()
        .then(products => {
            res.json(products);
        })
        .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
    const imageUrl = req.body.imageUrl;
    const title = req.body.title;
    const price = req.body.price;
    Cart.create({
        imageUrl: imageUrl,
        title: title,
        price: price
    })
    .then(() => {
        res.status(201).send({
            data: 'product added to cart'
        })
    })
    .catch(err => console.log(err));
}