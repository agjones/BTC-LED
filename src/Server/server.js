//server setup
    var express = require('express');
    var app = express();
    var morgan = require('morgan');

//server config
    var config = require('./config/config');

//routes
    require('./routes/routes')(app);

//server listen
    app.listen(config.port);
    console.log('Listening on ' + config.ip + ':' + config.port);