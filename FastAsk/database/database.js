const Sequelize = require("sequelize");

const connection= new Sequelize("fastask","root","08012004",{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;