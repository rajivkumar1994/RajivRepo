var fs = require('fs');
var promise = require('promise');

console.log('Executed before promise reading');


 let readPromise = fs.readFile('./files/files', 'utf8', function(err, data){
      return new Promise((resolve, reject) => {
        if(err){
            console.log('Rejected');
            reject(err);
            console.log(data);
        }
        else{
            console.log('Resolved');
            resolve(data);
            console.log(data);
        }
    });

    readPromise.then(function(fromResolve){
    console.log('Data is : ' + fromResolve);
}).catch(function(fromReject){
    console.log('Data Not Found  ' + fromReject);
})
     
     readPromise.then(function(fromResolve){
    console.log('Data is : ' + fromResolve);
}).catch(function(fromReject){
    console.log('Data Not Found  ' + fromReject);
})
     
     readPromise.then(function(fromResolve){
    console.log('Data is : ' + fromResolve);
}).catch(function(fromReject){
    console.log('Data Not Found  ' + fromReject);
})
     
 });

console.log('Executed after promise reading');