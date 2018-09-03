const Allpromise = new Promise((resolve, reject) => {
    if(true){
        resolve('stuff worked');
        resolve('We got Promises');
    }else{
        reject('Something went wrong');
    }
});

const Allpromise2 = new Promise((resolve, reject) => {
   setTimeout(resolve, 100, 'Hi'); 
});

const Allpromise3 = new Promise((resolve, reject) => {
   setTimeout(resolve, 1000, 'How are you'); 
});

const Allpromise4 = new Promise((resolve, reject) => {
   setTimeout(resolve, 5000, 'I am fine'); 
});

Promise.all([Allpromise,Allpromise2,Allpromise3,Allpromise4])
    .then(values => {
    console.log(values);
});

promise.then(result => {
    console.log(result + ' ? ');
}).catch(err => {
    console.log('Error');
});

promise.then(promise2).catch(error => {
    console.log(error);
});

promise.then((err, result) => {
 if(err){
     console.log(err);
 } else{
     console.log(result);
 }  
}).catch(error => {
    console.log('Error');
});
