const promise = new Promise((resolve, reject) => {
    if(true){
        resolve('stuff worked');
        resolve('We got Promises');
    }else{
        reject('Something went wrong');
    }
});

promise.then(result => console.log(result + '?'));
promise.then(function(err, result2){
    if(err){
        throw new Error('Bad Happened');
    }else{
        console.log(result2 + '!!!');
    }
})
.then((resolve, reject)=> {
    if(true){
        resolve('Resolved');
        console.log('Resolved');
    }else{
        reject('Rejected');
        console.log('Rejected');
    }
}).then(result3 => console.log(result3 + ' ? ? ? '))
.catch(err => console.log('Errorrrr'));