var fs = require('fs');

console.log('Executed Before Reading');

fs.readFile('./files/files', 'utf8', function(err,data){
    
    console.log(data);
});

console.log('Executed After Reading');

/**console.log('Executed Before Reading');

var sync = fs.readFileSync('./files/files', 'utf8');
    
    console.log(sync);

console.log('Executed After Reading');**/