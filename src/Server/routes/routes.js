//Routes file
var path = require('path');


//Make routes exportable
module.exports = function(app) {
    app.get('/', function (req, res) {
        res.send('BEEP BOOP!')
    });
};