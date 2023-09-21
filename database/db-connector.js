/*
    Citation for the following code:
    Date: 2023/05/24
    Adapted from:
    https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%201%20-%20Connecting%20to%20a%20MySQL%20Database
*/

// Get an instance of mysql we can use in the app
var mysql = require('mysql')

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_xyz',
    password        : '1234',
    database        : 'cs340_xyz'
})

// Export it for use in our application
module.exports.pool = pool;