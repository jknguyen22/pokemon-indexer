var mysql = require('mysql');
var pool = mysql.createPool({
//server credentials
});
module.exports.pool = pool;