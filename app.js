
var express = require('express');
var http = require('http');

var app = express();
const model = require('./database/cloud-datastore');

app.get('/getcustomers', async (req, res, next) => {
    model.list(10, (err, entities) => {
        if (err) {
            next(err);
            return;
        }
        res.json({ customers: entities });
    });
});

app.get('/getcustomer', async (req, res, next) => {
    model.read(req.query.id, (err, entity) => {
        if (err) {
            next(err);
            return;
        }
        res.json({ customer: entity });
    });
});

app.use((err, req, res, next) => {
    err.response = {
        message: err.message,
        internalCode: err.code,
    };
    next(err);
});

var port = (process.env.PORT || '8080');
app.set('port', port);

var server = http.createServer(app);

server.listen(port, function () {
    console.log("Express Server Runing on port " + app.get('port'));
});

module.exports = app;