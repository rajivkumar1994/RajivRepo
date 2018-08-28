const path = require('path');
const fs = require('fs');
const promise = require('promise');

/**console.log('Promises before Reading');

fs.readdir('C:/Users/Nodejs/Programs/multiply', (err, files) => {
    if(err){
        throw err
    }
    else{
        files.forEach(file => {
            console.log(file);
        });
    }
});

console.log('Promises after Reading');**/

console.log('Promises before Reading');

const readdirPromise = fs.readdir('C:/Users/Nodejs/Programs/multiply', (err, files) => {
    return new Promise((resolve, reject) => {
        if(err){
            console.log('Promise Rejected');
            reject(err);
        } if(files) {
            console.log('Promise Resolved');
            files.forEach(file => {
            console.log(file);
            resolve(file);
            });
        }
    });
    readdirPromise.then(function(fromResolve){
        console.log(fromResolve);
    }).catch(error => {
        console.log(error);
    });
    
    /**readdirPromise.then(function(fromResolve){
        console.log(fromResolve);
    }).catch(error => {
        console.log(error);
    });
    
    readdirPromise.then(function(fromResolve){
        console.log(fromResolve);
    }).catch(error => {
        console.log(error);
    });**/
    
});
    
console.log('Promises after Reading');