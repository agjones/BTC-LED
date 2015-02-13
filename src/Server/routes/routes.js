//Routes file
var path = require('path');


//Make routes exportable
module.exports = function(app) {
    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, '..', '..', 'Public/'));
    });
};