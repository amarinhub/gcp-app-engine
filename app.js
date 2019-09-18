// NodeJS modules for Express app - installed with NPM
var express = require('express');
var bodyParser = require('body-parser');

// Create the Express app 
var app = express();

// google-cloud/datastore
const model = require('./database/cloud-datastore');

//app.use(morgan('combined', { stream: winston.stream }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/** Test Endpoint */
// https://hale-post-251906.appspot.com/test
app.get('/test', async(req, res) => {
    res.send('Greetings from the Test controller!');
});


// // https://hale-post-251906.appspot.com/datastore/getcustomers
// app.get('/getcustomers', async (req, res, next) => {
//     model.list(10, (err, entities) => {
//         if (err) {
//             next(err);
//             return;
//         }
//         res.json({
//             items: entities
//         });
//     });
// });

// app.get('/getcustomerId', async (req, res, next) => {
//     model.read(req.query.id, (err, entity) => {
//         if (err) {
//             next(err);
//             return;
//         }
//         res.json(entity);
//     });
// });

app.use((err, req, res, next) => {
    // Format error and forward to generic error handler for logging and
    // responding to the request
    err.response = {
      message: err.message,
      internalCode: err.code,
    };
    next(err);
  });

module.exports = app;