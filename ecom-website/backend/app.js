const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const sequelize = require('./util/database');
const shopRoutes = require('./routes/shop');

const app = express();
app.use(bodyParser.json());
app.use(cors());


app.use(shopRoutes);



sequelize
.sync(
    // {force: true}
)
.then(() => {
    app.listen(3000);
})
.catch(err => console.log(err));