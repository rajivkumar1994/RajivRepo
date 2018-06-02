var express = require('express');
var app = express();
var router = express.Router();

router.use(function(req, res, next){
    console.log("/", req.method);
    next();
});

router.use("/user/:id", function(req, res, next){
console.log(req.params.id)     
if(req.params.id == 0){
    res.json({"message" : "Please Provide Id other than 0"
});
}
else
   next(); 
});

router.get("/", function(req,res){
    res.json({"message":"Welcome To Home Page"});
});

router.get("/user/:id", function(req,res){
    res.json({"Message" : "Hello " + req.params.id});
});

/**app.use("*", function(req, res, params){
    res.status(404).send((params[0].id).toString());
});**/

app.use("/api", router);

app.listen(3000, function(){
    console.log("Listening at Port 3000");
});