var express = require('express');
var router = express.Router();
var path = require('path');
var pool = require('../db/dbconnector');

router.get("api/v1/cities" , function (req, res, next) {

    var query_string = "SELECT * FROM 'city'";

    pool.getConnection(function (err, connection) {
        if(err){throw error}
        connection.query(qry_string, function (err, rows, fields) {
            connection.release();
            if(err){throw error}
            res.status(200).json(rows);
        });
    });

})





module.exports = pool;