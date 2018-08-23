const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/orderSchema');
const Product = require('../models/schema');

//Handling incoming GET Request
router.get('/', (req, res, next) =>{
    Order.find().select('_id quantity productId')
        .populate('productId', 'name')
        .exec()
        .then(docs => {
        const response = {
            count : docs.length,
            product : docs.map(doc => {
                return {
                _id : doc._id,
                productId :  doc.productId,
                quantity : doc.quantity,
                request : {
                    type : 'GET',
                    url : 'http://localhost:3000/orders/' + doc._id
                }
                }
            })
        }; 
        res.status(200).json(response);
    }).catch(err => {
        res.status(500).json({
            error : err
        })
    });
});

//Handling incoming POST Request
router.post('/', (req, res, next) =>{
    Product.findById(req.body.productId)
    .then(product => {
        if(!product){
            return res.status(404).json({
                message : 'Product Not Found'
            });
        }
        const order = new Order({
        _id : mongoose.Types.ObjectId(),
        productId : req.body.productId,
        quantity : req.body.quantity
    });
        return order.save()
    })
        .then(docs => {
        console.log(docs);
        res.status(201).json({
            message : 'Orders Saved Successfully',
            savedOrders : {
                _id : docs._id,
                productId : docs.productId,
                quantity : docs.quantity
            },
                request : {
                    type : 'GET',
                    url : 'http://localhost:3000/orders/' + docs._id
            }
        });
    }).catch(err => {
        res.status(500).json({
            error : err
        });
    });
});
    
router.get('/:orderId', (req, res, next) =>{
    const id = req.params.orderId;
    Order.findById(id).select('_id productId quantity')
        .populate('productId', 'name')
        .exec()
        .then(docs => {
        console.log(docs);
        res.status(200).json(docs);
    }).catch(err => {
        res.status(500).json({
            error : err
        });
    });
});

router.delete('/:orderId', (req, res, next) =>{
    const id = req.params.orderId;
    Order.remove({_id : id}).select('_id productId quantity').exec()
        .then(docs => {
        res.status(200).json({
            message : 'Order Deleted Successfully',
            orders : docs,
            DeletedOrders : {
                _id : docs._id,
                productId : docs.productId,
                quantity : docs.quantity,
                request :{
                    type : 'POST',
                    url : 'http://localhost:3000/orders',
                    body : { quantity : 'Number', productId : 'ID' }
                }
            }
        });
    }).catch(err => {
        res.status(500).json({
            error : err
        });
    });
});

module.exports = router;