var express = require('express');
var router = express.Router();
var path = require('path');
var pool = require('../db/dbconnector');
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({'extended' : 'true'}));
router.use(bodyParser.json());
router.use(bodyParser.json({type: 'application/vnd.api+json'}));

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
});

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

router.put("/countries/:code", function (req, res, next) {
    var country = req.body;
    var code = req.params.code;

    var query = {
        sql : 'UPDATE `country` SET Name = ? WHERE Code = "' + code + '"',
        values : [country.Name],
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

router.delete('/countries/:code', function (req, res) {
    var code = req.params.code;
    var query = 'DELETE FROM country WHERE Code = "' + code + '"';

    pool.getConnection(function (err, connection) {
        if (err) {throw error}
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
        "Message": "Welcome to API version 1, specify URL or search."
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
    };
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

module.exports = pool;
module.exports = router;