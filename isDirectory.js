const fs = require('fs');

const path = 'C:/Users/Nodejs/Programs/multiply';

const path1 = 'C:/Users/Nodejs/Programs/multiply/files/sample';

const path2 = 'C:/Python27/NEWS.txt';


/**fs.lstat(path, (err, stats) => {
   if(err){
       console.log(err);
   } else{
       console.log('Is File : ' + stats.isFile());
       console.log('Is Directory : ' + stats.isDirectory());
       console.log('Is FIFO : ' + stats.isFIFO());
       console.log('Is Socket : ' + stats.isSocket());
       console.log('Is BlockedDevice : ' + stats.isBlockDevice());
   }
});**/

fs.lstat(path1, (err, stats) => {
    if(err){
        console.log(err);
    }
   else if(stats.isDirectory()){
       console.log('Is Directory : ' + stats.isDirectory());
       fs.readdir(path1, 'utf8', (error,files) => {
           if(error){
               console.log(error);
           }else{
               files.forEach(file => {
                   console.log(file);
               });
           }
       });
   }
    else if(stats.isFile()){
       console.log('Is File : ' + stats.isFile());
       fs.readFile(path1, 'utf8', (error,files) => {
           if(error){
               console.log(error);
           }else{
                   console.log(files);
               }
           });
       }
});