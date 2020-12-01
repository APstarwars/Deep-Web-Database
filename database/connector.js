// Database connection program

const mysql = require('mysql');

const dbConnection = mysql.createConnection({
    debug: false,
    host: '127.0.0.1',
    port: '3306',
    user: 'mvonblan_cs355fl20',
    password: 'vo7615745',
    database: 'mvonblan_cs355fl20'
});

module.exports = dbConnection;