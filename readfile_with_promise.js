var fs = require('fs');
var promise = require('promise');

console.log('Executed before promise reading');

//let readPromise = function readFile(filename, enc){
    let readPromise = new Promise((resolve, reject) => {
        fs.readFile('./files/files', 'utf8', function(err, data){
        if(err){
            console.log('Rejected');
            reject(err);
            //console.log(data);
        }
        else{
            console.log('Resolved');
            resolve(data);
            //console.log(data);
        }
    });
});


readPromise.then(function(fromResolve){
    console.log('Data is ' + fromResolve);
}).catch(function(fromReject){
    console.log('Data is ' + fromReject);
})

/**fs.readFile('./files/files', 'utf8', function(err, data){
    return new Promise((resolve, reject) => {
        if(resolve){
            console.log('Resolved');
            console.log(data);
        }
        else{
            console.log('Rejected');
            console.log(data);
        }
    });
});**/
            
console.log('Executed after promise reading');