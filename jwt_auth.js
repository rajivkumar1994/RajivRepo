var express = require('express');
var jwt = require('jsonwebtoken');
var app = express();

app.get('/api', function(req, res){
    res.json({
        message:'Welcome to API'
    });
});

/**app.post('/api/post' , verifyToken , function(req, res){
    res.json({
        message: 'Welcome to POST method',
    });
});**/
         
app.post('/api/post', verifyToken, function(req, res){
    jwt.verify(req.token, 'secretkey', function(err, authData){
               if(err){
                res.sendStatus(403);
    }
             else{
              res.json({
        message:'Welcome to POST request',
        authData   
        });
             }
});
});

app.post('/api/post/login', function(req, res){
    const user = {
        username : 'Rajiv',
        id: 1,
        email : 'rajivkumar.p1994@gmail.com'
    }

jwt.sign({ user }, 'secretkey', { expiresIn: '30s'}, function(err, token){
    res.json({token});
});
});

function verifyToken(req, res, next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader!== 'undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }
    else{
        res.sendStatus(403);
    }
}

app.listen(5000, function(){
    console.log('Server Listening at 5000');
});
