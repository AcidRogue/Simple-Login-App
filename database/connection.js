var mysql = require('mysql');

var connection = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    port: 3306,
    user: 'acidrogue',
    password: 'predator98',
    database: 'login',
    debug: false,
    multipleStatements: true
});
module.exports.connection = connection;