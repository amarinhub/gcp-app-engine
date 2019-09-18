// NodeJS modules for Express app - installed with NPM
var express = require('express');
var http = require('http');

// Create the Express app 
var app = express();

// google-cloud/datastore
const model = require('./database/cloud-datastore');

/** Test Endpoint */
// https://8080-dot-8699478-dot-devshell.appspot.com/getcustomers
app.get('/test', async(req, res) => {
    res.send('Greetings from the Test controller!');
});

// https://8080-dot-8699478-dot-devshell.appspot.com/getcustomer/?id=5629499534213120
app.get('/getcustomers', async (req, res, next) => {
    model.list(10, (err, entities) => {
        if (err) {
            next(err);
            return;
        }
        res.json({
            customers: entities
        });
    });
});

https://8080-dot-8699478-dot-devshell.appspot.com/getcustomer/?id=5629499534213120
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
    // Format error and forward to generic error handler for logging and
    // responding to the request
    err.response = {
      message: err.message,
      internalCode: err.code,
    };
    next(err);
  });

var port = (process.env.PORT || '8080');
app.set('port', port);

/**
 * Create HTTP server.
 */
var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen( port, function(){
    console.log("Express Server Runing on port"+ app.get('port'));
});
module.exports = app;