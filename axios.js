const fs = require('fs');
const Path = require('path');
const axios = require('axios');

async function download(){
    const url ='https://unsplash.com/search/photos/paris-france';
    const path = Path.resolve(__dirname, 'images', 'street.jpeg');
    const response = await axios({
       method : 'GET',
       url : url,
       responseType : 'stream'
    });
    
    response.data.pipe(fs.createWriteStream(path));
    
    return new Promise((resolve, reject) => {
        response.data.on('end', () => {
          resolve();  
        });
        
        response.data.on('error', err => {
            reject(err);
        });
    });
}

download().then(()=>{
    console.log('Download completed');
});