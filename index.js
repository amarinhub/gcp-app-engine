/** FOR Google Cloud Platform ONLY  */
var app = require('./app');

function API(req,res) {
    if (!req.url) {
        req.url = '/';
        req.path = '/';
    }
    return app(req,res);
}

var backend = API;

module.exports = { backend };