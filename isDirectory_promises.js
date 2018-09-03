const fs = require('fs');
const promises = require('promise');

const path = 'C:/Users/Nodejs/Programs/multiply';

const path1 = 'C:/Users/Nodejs/Programs/multiply/files/sample';

const path2 = 'C:/Python27/NEWS.txt';


fs.lstat(path, (err, stats) => {
    if(err){
        console.log(err);
    }
   else if(stats.isDirectory()){
       console.log('Is Directory : ' + stats.isDirectory());
       const promise = fs.readdir(path, 'utf8', (error,files) => {
           if(error){
               console.log(error);
           } else {
            return new Promise((resolve, reject) => {
              if(error){
                  console.log('Rejected');
                  reject(error);
              }
              else{
                  console.log('Resolved');
                  resolve(files);
                  files.forEach(file => {
                   console.log(file);
               });
              }  
           });  
           }
     promise.then((fromResolve) => {
     console.log(fromResolve);
    }).catch((fromReject) => {
     console.log(fromReject);
    });
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