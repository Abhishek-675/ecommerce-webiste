const Product = require('../models/product');
const { Op } = require("sequelize");

exports.getProducts = (req, res, next) => {
    
    let page = !req.query.page ? 1 : parseInt(req.query.page);

    let totalItems;
    let start = (page * 2) - 1;
    let end = page * 2;

    Product.findAll().then(products => {
        totalItems = products.length;
    }).then(() => {
        Product.findAll({
            where: {
                id: {
                    [Op.between]: [start, end],
                }
            }
        }).then(products => {
            res.json({
                "products": products, "pagination": {
                    currentPage: page,
                    nextPage: page + 1,
                    previousPage: page - 1,
                    hasPreviousPage: page > 1,
                    hasNextPage: end < totalItems,
                }
            });
        }).catch(err => console.log(err))
    })
    
    }
    
    exports.addProduct = (req, res, next) => {
    
        const title = req.body.title;
        const imageUrl = req.body.imageUrl;
        const price = req.body.price;
    
        req.user.createProduct({
            title: title,
            imageUrl: imageUrl,
            price: price
        })
            .then((result) => {
                res.json({ success: true });
            })
            .catch(err => console.log(err));
};


exports.getCart = (req, res, next) => {
    req.user.getCart()
        .then((cart) => {
            return cart
                .getProducts()
                .then(products => {
                    res.json(products)
                })
        })
        .catch((err) => res.status(500).json({message: 'Failed'}));
};

exports.addToCart = (req, res, next) => {
    const prodId = req.body.id;
    let fetchedCart;
    let newQuantity = 1;
    req.user
        .getCart()
        .then((cart) => {
            fetchedCart = cart;
            return cart.getProducts({ where: { id: prodId } });
        })
        .then((products) => {
            let product;
            if (products.length > 0) {
                product = products[0];
            }
            if (product) {
                const oldQuantity = product.cartItem.quantity;
                newQuantity = oldQuantity + 1;
                return product;
            }
            return Product.findByPk(prodId);
        })
        .then(product => {
            return fetchedCart.addProduct(product, {
                through: { quantity: newQuantity }
            });
        })
        .then(() => {
            res.status(200).json({message: 'Success'});
        })
        .catch((err) => res.status(500).json({message: 'Failed'}));
}