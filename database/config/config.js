require('dotenv').config();
const { DB_NAME, DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_DIALECT } = process.env;

module.exports ={
  "development": {
    "username": DB_USER,
    "password": DB_PASS,
    "database": DB_NAME,
    "host": DB_HOST,
    "port": DB_PORT,
    "dialect": DB_DIALECT
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}