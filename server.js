'use strict';

var start = new Date().getTime();
var express = require('express');
var app = express();

app.use(express.static('public'));
app.use(function(req, res, next){
    res.set('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/:seconds', function (req, res) {
    console.log(req.params, new Date().getTime() - start);
    setTimeout(function(){
        res.send(`Hello World! By ${req.params.seconds} Seconds`);
    }, parseInt(req.params.seconds) * 1000);
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});