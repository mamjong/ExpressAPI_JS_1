var express = require('express');
var server = express();
var config = require('./config.json');

var port = process.env.PORT || config.WebPort;

app.all('*', function (req, res, next) {
    next();
})

app.use()

app.use()

app.get('*', function (req, res, next) {
    res.json({
        "warning": "Specify API version in URL"
    });
});

app.listen(port, function () {
    console.log("Server open at " + port);
})

module.exports = app;