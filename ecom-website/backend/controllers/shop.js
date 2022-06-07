const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
    req.user.getProducts()
    // Product.findAll()
        .then(products => {
            res.json(products);
        })
        .catch(err => console.log(err));
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findByPk(prodId)
      .then(product => {
        res.render('shop/product-detail', {
          product: product,
          pageTitle: product.title,
          path: '/products'
        });
      })
      .catch(err => console.log(err));
    };







// exports.postProducts = (req, res, next) => {
//     const imageUrl = req.body.imageUrl;
//     const title = req.body.title;
//     const price = req.body.price;
//     req.user.createProduct({
//     // Product.create({
//         imageUrl: imageUrl,
//         title: title,
//         price: price
//     })
//         .then(() => {
//             res.status(201).send({
//                 data: 'product added'
//             })
//         })
//         .catch(err => console.log(err));
// }

exports.getIndex = (req, res, next) => {
    Product.findAll()
      .then(products => {
        res.render('shop/index', {
          prods: products,
          pageTitle: 'Shop',
          path: '/'
        });
      })
      .catch(err => console.log(err));
  };

exports.getCart = (req, res, next) => {
    req.user.getCart()
    // Cart.
        .then((cart) => {
            return cart
                .getProducts()
                .then(products => {
                    res.json(products)
                })
                .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
};

exports.postCart = (req, res, next) => {
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