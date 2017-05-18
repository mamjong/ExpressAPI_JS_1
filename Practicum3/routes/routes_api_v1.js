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

router.post("/countries", function (req, res, next) {
    var code = req.body.Code;
    var name = req.body.Name;
    var continent = req.body.Continent;
    var region = req.body.Region;
    var surfaceArea = req.body.SurfaceArea;
    var indepYear = req.body.IndepYear;
    var population = req.body.Population;
    var lifeExpectancy = req.body.LifeExpectancy;
    var gnp = req.body.GNP;
    var gnpOld = req.body.GNPOld;
    var localName = req.body.LocalName;
    var governmentForm = req.body.GovernmentForm;
    var headOfState = req.body.HeadOfState;
    var capital = req.body.Capital;
    var code2 = req.body.Code2;

    var query = {
        sql : 'INSERT INTO `country`(Code, Name, Continent, Region, SurfaceArea, IndepYear, Population, LifeExpectancy, ' +
        'GNP, GNPOld, LocalName, GovernmentForm, HeadOfState, Capital, Code2) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
        values : [code, name, continent, region, surfaceArea, indepYear, population, lifeExpectancy, gnp, gnpOld, localName,
        governmentForm, headOfState, capital, code2],
        timeout : 2000
    };
    console.log('query', query.sql);
    res.contentType("application/json");
    pool.getConnection(function (err, connection) {
        if (err) {throw err}
        connection.query(query, function (err, rows, fields) {
            connection.release();
            if (err) {throw err}
            res.status(200).json(rows);
        })
    })

});

router.get("*", function (req, res) {
    res.status(200);
    res.json({
        "Message" : "Welcome to API version 1, specify URL or search."
    })
});

module.exports = pool;
module.exports = router;