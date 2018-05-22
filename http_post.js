var http = require('http');
var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var path = require('path');
//app.use(bodyparser);

app.use(bodyparser.urlencoded({
    extended : true
}));
app.use(bodyparser.json());

app.get('/', function(req, resp) {
//resp.sendFile('index.html', {root : path.join(__dirname, './files')});

resp.sendFile(__dirname + '/index.html');

});

app.post('/', function(req,resp) {
resp.end(JSON.stringify(req.body));
})

app.listen(8080,function(){
console.log('Listening at port 8080');
});