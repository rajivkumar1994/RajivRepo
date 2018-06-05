var express = require('express');
var mysql = require('mysql');
var app = express();

/**var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'sampleDB'
});**/

var connection = mysql.createPool({
    connectionLimit:50,
    host:'localhost',
    user:'root',
    password:'',
    database:'sampleDB'
});

/**connection.connect(function(error){
    if(error){
        console.log('Error');
    }
    else{
        console.log('Successful');
    }
});**/

app.get('/', function(req, resp){
    connection.getConnection(function(error, tempConnection){
        if(error){
            console.log('Error');
        }
    else{
        console.log('SUCCESS');
        tempConnection.query("SELECT * FROM myTable", function(error, rows){
            if(error){
                console.log('Error');
            }
        else{
            console.log('SUCCESS!!!\n');
            console.log(rows);
            console.log('rows with Name...\n' + rows[1].Name);
            resp.json(rows);
        }
    });
    }
});
});

app.listen(1337);