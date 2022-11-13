var http = require("http");
var url = require("url");
var fs = require("fs");
var qs = require("querystring");

// const port = process.env.PORT || 3000;

function css(request, response) {
    if (request.url === "/style.css") {
        response.writeHead(200, {"Content-type": "text/css"});
        var fileContent = fs.readFileSync("./style.css", {encoding: "utf8"});
        response.write(fileContent);
        response.end();
    } 
}

var renderMenu = fs.readFileSync ('./menu.html')
var renderAbout = fs.readFileSync ('./about.html')
var renderprofile = fs.readFileSync ('./profile.html')
var renderDaftar = fs.readFileSync ('./daftar.html')

var server = http.createServer(function(request,response){
    css(request, response);
    response.writeHead(200, {"Content-Type": "text/html"});
    var q = url.parse(request.url,true)
    if (q.pathname == "/" && request.method == "GET"){
        var keyword = q.query.keyword;
        if (keyword){
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write("<h2>Pencarian</h2>");
            response.write("<p>Anda Mencari : <b>" + keyword + "</b> </p>");
            response.write("<h3><b></b>Tidak ada Hasil ! Maaf Website ini masih dalam tahap pengembangan</b></h3>");
            response.end("<a href='/'>Kembali</a>");
            }
        else{
            fs.readFile("index.html",function(error,data){
                if (error){
                    response.writeHead(404,{"Content-Type": "text/html"});
                    response.end("404 Not Found");
                }
            response.writeHead(200,{"Content-Type":"text/html"});
            response.write(data)
            response.end();    
            });
        }
    }
    else if (request.url==='/menu'){
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(renderMenu);
        response.end();
    }
    else if (request.url==='/about'){
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(renderAbout);
        response.end();
    }
    else if (request.url==="/login" && request.method === "GET"){
        fs.readFile("login.html", (error,data) =>{
            if (error){
                response.writeHead(404, {"Content-Type": "text/html"});
                return response.end("404 Server Not Found");                
            }
            else{
                response.writeHead(200, {"Content-Type": "text/html"});
                response.write(data);
                return response.end();
            }
        });
    }
    else if (request.url==="/login" && request.method === "POST") {
        var requestBody = "";
        request.on("data",function(data) {
            requestBody += data;
        });
        request.on("end",function(){
            var formData = qs.parse(requestBody);
            if (formData.username === "yuni" && formData.password === "2000") {
                response.writeHead(200,{"Content-Type": "text/html"});
                response.end(renderprofile);
            }
            else{
                response.writeHead(200, {"Content-Type": "text/html"});
                response.write("<h2>Login Gagal</h2>");
                response.write("<a href='/login'>Coba Kembali</a>");
                response.end();
            }
        });
    }
    else if (request.url==="/daftar" && request.method === "GET"){
        fs.readFile("daftar.html",(error,data)=>{
            if (error){
                response.writeHead(404,{"Content-Type":"text/html"});
                return response.end("404 Server Not Found");                
            }
            else{
                response.writeHead(200, {"Content-Type":"text/html"});
                response.write(data)
                return response.end()
            }
        });
    }
    else if (request.url==="/daftar" && request.method === "POST"){
        
        var requestDaf = "";
        request.on("data",function(data){
            requestDaf += data;
        });
        request.on("end",function(){
            var formData = qs.parse(requestDaf);
            response.writeHead(200,{"Content-Type":"text/html"});
            response.write(renderDaftar)
            response.write('<center>'+
            '<table class="kotak">'+
            '<h2>Hasil Pendaftaran :</h2>'+
            '<tr>'+
                '<th>'+
                    'Nama '+
                '</th>'+            
                '<td>'+
                    ': '+formData['fname'] +' '+ formData['lname']+
                '</td>'+
    
            '</tr>'+
            '<tr>'+
                '<th>'+
                    'Username '+
                '</th>'+            
                '<td>'+
                    ': '+formData['username']+
                '</td>'+
            '</tr>'+
            '<tr>'+
                '<th>'+
                    'Password '+
                '</th>'+            
                '<td>'+
                    ': '+formData['password']+
                '</td>'+
            '</tr>'+
            '<tr>'+
                '<th>'+
                    'Email '+
                '</th>'+            
                '<td>'+
                    ': '+formData['mail']+
                '</td>'+
    
            '</tr>'+
            '<tr>'+
                '<th>'+
                    'Telephone '+
                '</th>'+            
                '<td>'+
                    ': '+formData['tel']+
                '</td>'+
    
            '</tr>'+
            
            '</table>'+
            '</center>'
            );
            response.end()
        });
    }

});

server.listen(3000);
console.log("server Berjalan Lancar");