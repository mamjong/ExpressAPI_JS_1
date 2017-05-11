var express = require('express');
var router = express.Router();
var path = require('path');
var pool = require('../db/dbconnector');

router.get('/countries', function (req, res, next) {
    var query = 'SELECT * FROM country';

    pool.getConnection(function (err, connection) {
        if (err) {throw error}
        connection.query(query, function (err, rows, fields) {
            connection.release();
            if (err) {throw error}
            res.status(200).json(rows);
        });
    });
});

router.get('/countries/:countryId', function (req, res) {
    var countryId = req.params.countryId;
    var query = 'SELECT * FROM country';

    pool.getConnection(function (err, connection) {
        if (err) {throw error}
        connection.query(query, function (err, rows, fields) {
            connection.release();
            if (err) {throw error}
            res.status(200).json(rows[countryId]);
        })
    })
})

router.get("*", function (req, res) {
    res.status(200);
    res.json({
        "Message" : "Welcome to API version 1, specify URL or search."
    })
});

module.exports = pool;
module.exports = router;