var mysql = require('mysql')

// NOTE: After adding your user and password, change this file name 
// to "database-connector.js"

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'user',
    password        : 'password',
    database        : 'gotcha_games',
    port: 3306
})

module.exports.pool = pool;