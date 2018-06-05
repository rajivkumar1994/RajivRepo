var http = require('http');
var qs = require('querystring');
var stringBuilder = require('stringbuilder');

function getCalcHtml(req, resp, data){
var sb = new stringBuilder({newline : "\r\n"});
sb.appendLine("<html>");
sb.appendLine("<body>");
sb.appendLine("<form method = 'post'>");
sb.appendLine("<table>");
    
sb.appendLine("<tr>");
sb.appendLine("<td> Enter first Number : </td>");
sb.appendLine("</tr>");

if(data && data.firstNo){
sb.appendLine("<tr>");
sb.appendLine("<td> <input type = 'text' id='firstNo' name = 'firstNo' value='{0}'/> </td>", data.firstNo);
sb.appendLine("</tr>");
}

else{
sb.appendLine("<tr>");
sb.appendLine("<td> <input type = 'text' id='firstNo' name = 'firstNo' value=''/> </td>");
sb.appendLine("</tr>");  
}
    
if(data && data.secondNo){
sb.appendLine("<tr>");
sb.appendLine("<td> <input type = 'text' id='secondNo' name = 'secondNo' value='{0}'/> </td>", data.secondNo);
sb.appendLine("</tr>"); 
}

else{
sb.appendLine("<tr>");
sb.appendLine("<td> <input type = 'text' id='secondNo' name = 'secondNo' value=''/> </td>");
sb.appendLine("</tr>");  
}
   
sb.appendLine("<tr>");
sb.appendLine("<td> <input type ='submit' value='Calculation'/> </td>");
sb.appendLine("</tr>");
    
if(data && data.firstNo && data.secondNo){
var sum = parseInt(data.firstNo) + parseInt(data.secondNo);
sb.appendLine("<tr>");
sb.appendLine("<td> Sum = {0} </td>", sum);
sb.appendLine("</tr>");
}
    
sb.appendLine("</table>");
sb.appendLine("</form>");
sb.appendLine("<body>");
sb.appendLine("</body>");
sb.appendLine("<html>");
    
sb.build(function(err, result){
    resp.writeHead(200, {"Content-Type" : "text/html"});
    resp.write(result);
    resp.end();
});
}

function getCalc(req, resp, formData){
 resp.writeHead(200, "Welcome To Calculation", {"Content-Type" : "text/html"});
 getCalcHtml(req, resp, formData);   
}

function getHome(req, resp){
    resp.writeHead(200, "Welcome To Home Page", {"Content-Type" : "text/html"});
    resp.write("<html><head><title>Home Page</title></head><body>Want to do addition? Click <a href='/add'> Here </a></body></html>");
    resp.end();
}

function get404(req, resp){
    resp.writeHead(404, "Page Not Found", {"Content-Type" : "text/html"});
    resp.write("<html><head><title>Page Not Found</title></head><body>Click <a href='/'> Here to go back to Home page</a></body></html>");
    resp.end(); 
}

function get405(req, resp){
    resp.writeHead(405, "Method Not Found", {"Content-Type" : "text/html"});
    resp.write("<html><head><title>Method Not Found</title></head><body>Click <a href='/'> Here to go back to Home page</a></body></html>");
    resp.end();
}

http.createServer(function(req, resp){
    switch(req.method){
            case "GET":
                if(req.url==='/'){
                    getHome(req, resp);    
                }
    
                else if(req.url==='/add'){
                    getCalc(req, resp);
                }
    
                else{
                    get404(req, resp); 
                }
                break;
    
            case "POST":
            if(req.url==='/add'){
                reqBody='';
                req.on('data', function(data){
                    reqBody+=data;
                    if(reqBody>1e7){ //10MB OF DATA
                      resp.writeHead(413, "Content Too Large", {"Content-Type" : "text/html"});
                      resp.write("<html><head><title>Content Too Large</title></head><body>Provide Less Data to handle</body></html>");
                      resp.end();  
                    }
                });
                
                req.on('end', function(data){
                    var formData = qs.parse(reqBody);
                    getCalc(req, resp, formData);
                });
            }
            break;
    
            default:
                    get405(req, resp);
            break;
        }
        
        
}).listen(9090, function(){
    console.log("Listening at Port 9090");
});