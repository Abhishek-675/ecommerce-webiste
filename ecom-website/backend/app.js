const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const sequelize = require('./util/database');
const routes = require('./routes/router');

const Product = require('./models/product');
const CartItem = require('./models/cart-item');
const User = require('./models/user');
const Cart = require('./models/cart');

const app = express();
app.use(bodyParser.json());
app.use(cors());


app.use((req, res, next) => {
    User.findByPk(1)
    .then(user => {
        req.user = user;
        next();
    })
    .catch(err => console.log(err));
})

app.use(routes);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});


sequelize
.sync(
    // {force: true}
)
.then(result => {
    return User.findByPk(1);
})
.then(user => {
    if (!user) {
        return User.create({ name: 'test', email: 'test@gmail.com' });
    }
    return user;
})
.then(user => {
    return user.createCart();
})
.then(() => {
    app.listen(3000);
})
.catch(err => console.log(err));