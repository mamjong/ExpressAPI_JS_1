/**
 * Created by Mika Krooswijk on 11-5-2017.
 */

var mysql = require('mysql');
var config = require('../config');

var pool = mysql.createPool({
    connectionLimit : 25,
    host    :   config.server,
    user    :   config.username,
    password:   config.password,
    database:   config.dbname
});



module.exports = pool;