$(function() {
    //define socket.io socket
    var socket = io();

//chart stuff
    //chart context init
    var chartContext = $('#indexChart').get(0).getContext('2d');
    //chart data init
    var chartData = {
        labels : [' ', ' '],
        datasets : [
            {
            label : ['BTC price index'],
            fillColor : 'rgba(220,220,220,0.2)',
            strokeColor : 'rgba(220, 220, 220, 1)',
            pointColor : 'rgba(200, 200, 200, 1)',
            pointStrokeColor : '#fff',
            pointHighlightFill : '#fff',
            pointHighlightStroke : 'rgba(220,220,220,1)',
            data : [0, 0]
            }
        ]
    };
    
    var indexChart = new Chart(chartContext).Line(chartData);

//when pricechange event emitted, change the deviation text to the emitted value

    
    socket.on('pricechange', function(msg) {
        var date = new Date();
        $('#deviation').text(msg);
        indexChart.addData([msg], date.getHours() + ':' + date.getMinutes());
    });    
    
});