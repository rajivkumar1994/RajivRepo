var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

const productRoute = require('./api/router/products')
const orderRoute = require('./api/router/orders');
const userRoute = require('./api/router/users');

mongoose.connect('mongodb://node-shop:'+ process.env.MONGO_DB_ATLAS_PW +'@node-shop-shard-00-00-uvv2a.mongodb.net:27017,node-shop-shard-00-01-uvv2a.mongodb.net:27017,node-shop-shard-00-02-uvv2a.mongodb.net:27017/test?ssl=true&replicaSet=node-shop-shard-0&authSource=admin&retryWrites=true', { useNewUrlParser: true });

app.use('/uploads', express.static('uploads'));

app.use((req, res, next) => {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Header", "*");
    
    if(req.method === 'OPTIONS'){
        res.header("Access-Control-Allow", "PUT, POST, PATCH, DELETE");
        return res.status(200).json({});
    }
    next();
});

app.use('/products', productRoute);
app.use('/orders', orderRoute);
app.use('/users', userRoute);

app.use((req, res, next)=>{
   const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
});

module.exports = app;