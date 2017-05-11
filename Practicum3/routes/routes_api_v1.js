var express = require('express');
var router = express.Router();
var path = require('path');
var pool = require('../db/dbconnector');

router.get("*", function (req, res) {
    res.status(200);
    res.json({
        "Message" : "Welcome to API version 1, specify URL or search."
    })
});

module.exports = pool;
module.exports = router;