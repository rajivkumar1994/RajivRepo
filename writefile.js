var fs = require('fs');

console.log('Executed Before Writing');

fs.writeFile('./files/files2', 'How are you?', 'utf8', function(err,data){
    
    console.log(data);      
    
});

console.log('Executed After Writing');