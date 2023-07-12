const { Sequelize } = require('sequelize');
require('dotenv').config();
const { DB_NAME, DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_DIALECT } = process.env;

const sequelize = new Sequelize(
    DB_NAME, 
    DB_USER, 
    DB_PASS, {
        dialect: DB_DIALECT,
        host: DB_HOST,
        port: DB_PORT
    }
);

module.exports = {sequelize};