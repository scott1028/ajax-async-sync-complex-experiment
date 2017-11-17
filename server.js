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

app.get('/html/:seconds', function (req, res) {
    console.log(req.params, new Date().getTime() - start);
    res.write('<html>');
    res.write('<head>');
    res.write('<script src="https://code.jquery.com/jquery-1.12.4.js"></script>');
    res.write(`<script>$(window).load(function(){
        console.log($('#obj'));
    });</script>`);
    res.write('</head>');
    res.write('<body>');
    setTimeout(function(){
        res.write(`Hello World! By ${req.params.seconds} Seconds`);
        setTimeout(function(){
            res.write('<div id="obj"></div>')
            res.write('</body></html>');
            res.end();
        }, 1000);
    }, parseInt(req.params.seconds) * 1000);
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});