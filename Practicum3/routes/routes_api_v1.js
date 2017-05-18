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

router.post('/cities', function (req, res, next){
    var ID = req.body.ID;
    var name = req.body.Name;
    var countryCode = req.body.CountryCode;
    var district = req.body.District;
    var population = req.body.Population;


    var query_str = {
        sql: 'INSERT INTO `city`(ID, name, countryCode, district, population) VALUES (?,?,?,?,?);',
        values: [ID, name, countryCode, district, population],
        timeout: 2000
    };
    console.log('query:' + query_str.sql);
    res.contentType('application/json');
    pool.getConnection( function(err, connection){
        if (err){throw err}
        connection.query(query_str, function(err, rows,fields){
            connection.release();
            if(err){throw err}
            res.status(200).json(rows);
        });
    });
});

module.exports = pool;
module.exports = router;