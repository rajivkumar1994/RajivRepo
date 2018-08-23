const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/schema');
const multer = require('multer');

const storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, 'uploads/');
    },
    filename : function(req, file, cb){
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);   
    }
});

const fileFilter = (req, file, cb)=> {
    if(file.mimetype === "image/jpg" || file.mimetype === "image/png"){
        cb(null , true);
    }
    else{
        cb(null, false);
    }
};

const uploads = multer({ storage : storage , 
    limits : {
    fileSize : 1024*1024*8            
}, fileFilter : fileFilter });

router.get('/', (req, res, next) =>{
    Product.find().select('_id name price productImage')
        .exec().then(docs => {
        const response = {
        count : docs.length,
        products : docs.map(doc => {
            return {
                name : doc.name,
                price : doc.price,
                _id : doc._id,
                productImage : doc.productImage,
                request : {
                    type : 'GET',
                    url : 'http://localhost:3000/products/' + doc._id
                }
            }
        })
     };
    res.status(201).json(response);
    }).catch(error => {
        res.status(200).json(error);
    });
});

router.post("/", uploads.single('productImage'), (req, res, next) =>{
    console.log(req.file);
    const product = new Product({
        _id : new mongoose.Types.ObjectId(),
        name : req.body.name,
        price : req.body.price,
        productImage : req.file.path
    });
    product.save()
        .then(result =>{
         res.status(201).json({
            message : 'Product Saved Successfully',
            createdProduct : {
                name : result.name,
                price : result.price,
                _id : result._id,
                request : {
                type : 'GET',
                url : 'http://localhost:3000/products/' + result._id
            }
         }
        });
    }).catch(err => {
        res.status(500).json(err)
    });
});

router.patch('/:productId', (req, res, next) =>{
    const id = req.params.productId;
    const updateOps = {};
    for (ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    
    Product.update({_id : id}, { $set : updateOps }).select('_id name price').exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json(error)
    });
});

router.delete('/', (req, res, next) =>{
    res.status(200).json({
        message : 'Delete Method Works'
    });
});

//Restful API

router.get('/:productId', (req, res, next) =>{
    const id = req.params.productId;
    Product.findById(id).select('_id name price productImage')
        .exec()
        .then(docs => {
        console.log(docs);
        res.status(200).json(docs);
    }).catch(error => {
        console.log(error);
        res.status(500).json(error);
    });
});

router.delete('/:productId', (req, res, next) =>{
    const id = req.params.productId;
    Product.remove({_id : id}).select('_id name price').exec()
    .then(result => {
        res.status(200).json({
            message : 'Product Deleted Successfully',
                request : {
                    type : 'POST',
                    description : 'Product deleted. You can POST a request for the product',
                    url : 'http://localhost:3000/products/',
                    body : {name : 'String', price : 'Number'}
                }
        });  
    }).catch(eror => {
        res.status(500).json(error);
    });
});

module.exports = router;
