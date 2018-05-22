var http = require('http');
var express = require('express');
var app = express();

app.get('/', function(req, resp){
var response = "Hello to mathematical operations" ;
resp.end(response);
});

app.get('/add', function(req, resp){

var response = "Welcome to Addition"
    
resp.end(response);
});

app.get('/sub', function(req, resp){

var response = "Welcome to Subtraction"

resp.end(response);
});

app.get('/multiply', function(req, resp){

var response = "Welcome to Multiplication"

resp.end(response);
});

app.get('/division', function(req, resp){

var response = "Welcome to Division"

resp.end(response);
});

app.listen(8081,function(){
console.log('Listening at port 8081');
});