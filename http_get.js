var http = require('http');
var express = require('express');
var app = express();

app.get('/', function(req, resp){
var response = "Hello " + req.query.firstName;
resp.end(response);
});

app.listen(8080,function(){
console.log('Listening at port 8080');
});