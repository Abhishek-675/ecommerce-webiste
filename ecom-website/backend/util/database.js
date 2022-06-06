const Sequelize = require('sequelize');

const sequelize = new Sequelize('ecom-website', 'root', '4444', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;