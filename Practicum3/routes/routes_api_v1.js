var express = require('express');
var router = express.Router();
var path = require('path');
var pool = require('../db/dbconnector');

router.get("/cities", function (req, res, next) {
    var query = 'SELECT * FROM city';

    pool.getConnection(function (err, connection) {
        if(err){throw error}
        connection.query(query, function (err, rows, fields) {
            connection.release();
            if(err){throw error}
            res.status(200).json(rows);
        });
    });
});

router.get("/cities/:id", function (req, res, next) {
    var id = req.params.id;
    var query = 'SELECT * FROM city WHERE ID = ' + id;

    pool.getConnection(function (err, connection) {
        if(err){throw error}
        connection.query(query, function (err, rows, fields) {
            connection.release();
            if(err){throw error}
            res.status(200).json(rows);
        });
    });
});

module.exports = pool;
module.exports = router;