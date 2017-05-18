var express = require('express');
var router = express.Router();
var path = require('path');
var pool = require('../db/dbconnector');
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({'extended' : 'true'}));
router.use(bodyParser.json());
router.use(bodyParser.json({type: 'application/vnd.api+json'}));

router.get("/cities", function (req, res, next) {
    var query = 'SELECT * FROM city';

    pool.getConnection(function (err, connection) {
        if(err){throw err}
        connection.query(query, function (err, rows, fields) {
            connection.release();
            if(err){throw err}
            res.status(200).json(rows);
        });
    });
});

router.get("/cities/:id", function (req, res, next) {
    var id = req.params.id;
    var query = 'SELECT * FROM city WHERE ID = ' + id;

    pool.getConnection(function (err, connection) {
        if(err){throw err}
        connection.query(query, function (err, rows, fields) {
            connection.release();
            if(err){throw err}
            res.status(200).json(rows);
        });
    });
});

router.post("/cities", function (req, res, next) {
    var ID = req.body.ID;
    var name = req.body.Name;
    var countryCode = req.body.CountryCode;
    var district = req.body.District;
    var population = req.body.Population;


    var query = {
        sql : 'INSERT INTO `city`(ID, Name, CountryCode, District, Population) VALUES (?,?,?,?,?);',
        values : [ID, name, countryCode, district, population],
        timeout : 2000
    }
    console.log('query', query.sql);
    res.contentType("application/json");
    pool.getConnection(function (err, connection) {
        if(err){throw err}
        connection.query(query, function (err, rows, fields) {
            connection.release();
            if(err){throw err}
            res.status(200).json(rows);
        });
    });
});

router.put("/cities/:id", function (req, res, next) {
    var city = req.body;
    var id = req.params.id;

    var query = {
        sql : 'UPDATE `city` SET Name = ?, District = ?, Population = ? WHERE ID = ' + id,
        values : [city.Name, city.District, city.Population],
        timeout : 2000
    }
    console.log('query', query.sql);
    res.contentType("application/json");
    pool.getConnection(function (err, connection) {
        if(err){throw err}
        connection.query(query, function (err, rows, fields) {
            connection.release();
            if(err){throw err}
            res.status(200).json(rows);
        });
    });
});

router.delete("/cities/:id", function (req, res, next) {
    var id = req.params.id;
    var query = 'DELETE FROM city WHERE ID = ' + id;

    pool.getConnection(function (err, connection) {
        if(err){throw err}
        connection.query(query, function (err, rows, fields) {
            connection.release();
            if(err){throw err}
            res.status(200).json(rows);
        });
    });
});


module.exports = pool;
module.exports = router;