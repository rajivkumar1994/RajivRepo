var http = require('http');
var express = require('express');
var app = require('./app');

const server = http.createServer(app);

app.listen(3000, function(){
    console.log('Listening at 3000');
});