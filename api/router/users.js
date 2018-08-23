const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/users');

router.post('/signup', (req, res, next)=> {
   User.find({email : req.body.email}).exec()
       .then(user => {
       if(user.length >=1){
           return res.status(409).json({
               message : 'User Already Exists'
           });
       } 
       else{
           bcrypt.hash(req.body.password, 10, (err, hash) => {
              if(err){
                  return res.status(500).json({
                     error : err 
                  });
              } else{
                  const user = new User({
                      _id : new mongoose.Types.ObjectId(),
                     email : req.body.email,
                     password : hash
                  });
            user.save()
            .then(result => {
                    console.log(result);
                    res.status(201).json({
                    message : 'User Created Successfully'  
                });
              }).catch(err => {
                    console.log(err);
                    res.status(500).json({
                    error : err
           });
       });
}
   });
}
})
});

router.post('/login', (req, res, next) => {
   User.find({email : req.body.email}).exec()
       .then(user => {
            if(user.length < 1){
                return res.status(401).json({
                    message : 'Auth Failed. Signup Before login'
                });
            }
            else {
                bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                   if(err){
                    return res.status(401).json({
                    message : 'Auth Failed. Signup Before login'
                });
                   } if(result) {
                    const token = jwt.sign({
                    email : user[0].email,
                    userid : user[0]._id
                },
                    process.env.JWT_KEY,
                    //'SECRET',
                {
                    expiresIn : '1h'
                });
                        return res.status(201).json({
                        message : 'Auth successful',
                        token : token
                       });
                   } 
                });
            }
   }).catch(error => {
       console.log(error); 
       res.status(500).json({
       error : error 
      }); 
   }); 
});

router.delete('/:userId', (req, res, next)=> {
    const id = req.params.userId;
    User.remove({_id : id}).exec()
    .then(result => {
        res.status(200).json({
            message : 'User Deleted Successfully'
        });
    }).catch(error => {
        res.status(500).json({
           error : error 
        });
    });
});

module.exports = router;