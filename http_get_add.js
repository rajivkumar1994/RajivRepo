var http = require('http');
var express = require('express');
var app = express();

var bodyparser = require('body-parser');
var path = require('path');

app.use(bodyparser.urlencoded({
    extended : true
}));
app.use(bodyparser.json());

app.get('/', function(req, resp){
var response = "Hello to mathematical operations" ;
resp.end(response);
});

//app.get('/add/:val1/:val2', function(req, resp){
app.get('/add', function(req, resp){
//var response = "Welcome to Addition";
resp.sendFile(__dirname + '/index_add.html');
//resp.end(response);
});

app.get('/sub', function(req, resp){

var response = "Welcome to Subtraction";

resp.end(response);
});

app.get('/multiply', function(req, resp){

var response = "Welcome to Multiplication";

resp.end(response);
});

app.get('/division', function(req, resp){

var response = "Welcome to Division";

resp.end(response);
});

app.listen(8081,function(){
console.log('Listening at port 8081');
});