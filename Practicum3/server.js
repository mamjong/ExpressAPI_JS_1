var express = require('express');
var server = express();
var config = require('./config.json');

var port = process.env.PORT || config.WebPort;

server.all('*', function (req, res, next) {
    next();
})

server.use('/api/v1', require('./routes/routes_api_v1'));


server.get('*', function (req, res, next) {
    res.json({
        "warning": "Specify API version in URL"
    });
});

server.listen(port, function () {
    console.log("Server open at " + port);
})

module.exports = server;