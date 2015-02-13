//server setup
    var express = require('express');
    var app = express();
    var morgan = require('morgan');
    var https = require('https');
    var http = require('http').Server(app);
    var io = require('socket.io')(http);
    var path = require('path');

//server config
    var config = require('./config/config');
    app.use(express.static(path.join(__dirname, '..', 'Public/')));

//routes
    require('./routes/routes')(app);

//server listen
    http.listen(config.port);
    console.log('Listening on ' + config.ip + ':' + config.port);
    
//set up socket.io
    io.on('connection', function(socket) {
        console.log('User connected! Sending updated price information');
        getBitcoinInfo();
        socket.on('disconnect', function() {
            console.log('User disconnected!');
        });
    });
    
//set up api scrape, eventually send information to gpio
    //options for the GET request
    var getOptions = {
                host : 'api.bitcoinaverage.com',
                port : 443,
                path : '/ticker/USD/',
                method : 'GET'
            };
    
    //Function to update BTC information from bitcoinaverage API over time
    var timer = function() {
        getBitcoinInfo()
        setTimeout(timer, 30000);
    };
    
    //Function to update all BTC information, called via timer and when clients connect via socket
    var getBitcoinInfo = function(cb) {
        var reqGet = https.request(getOptions, function(res) {
           console.log('Status: ' + res.statusCode);
           res.on('data', function(data) {
               var parsedData = JSON.parse(data);
               
               //this is the magic number we use to determine health of btc price
               var index = calculateIndex(parsedData);
               
               //update the GPIO stuff
               updateGPIO(index);
               
               //send data to the user
               io.emit('pricechange', index);
           });
        });
        
        reqGet.end();
        reqGet.on('error', function(e) {
            console.error(e);
        });
    };
    
    //Stub right now, should be replaced by actual code that modifies GPIO stuff in the future
    var updateGPIO = function(data) {
        console.log(data)
    };
    
    //magical function that calculates the BTC wellness index
    var calculateIndex = function(data) {
        return data['ask'] - data['24h_avg'];
    }
    
    //start timer for scraping
    timer();