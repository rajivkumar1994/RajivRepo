var fs = require('fs');
var promise = require('promise');

console.log('Executed before promise reading');

function readFile(filename, enc){
    return new Promise((resolve, reject) => {
        fs.readFile('./files/files', 'utf8', function(err, data){
        if(err){
            console.log('Rejected');
            reject(err);
            console.log(data);
        }
        else{
            resolve(data);
            console.log('Resolved');
            console.log(data);
        }
    });
});
    
}

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