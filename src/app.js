/*
    Application principale du projet Robot
*/


var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
  , parse = require('./parser.js')
  , control = require('./serialControl.js')
  , path = require('path');


//port d'ecoute du serveur http
var port = 8080;

app.listen(port);

//support de plusieurs type de fichier
extensions = {
    ".html" : "text/html",
    ".css" : "text/css",
    ".js" : "application/javascript",
    ".png" : "image/png",
    ".gif" : "image/gif",
    ".jpg" : "image/jpeg"
};
 
//fonction pour la vérification des fichiers
function getFile(filePath,res,page404,mimeType){
    //test de l'éxistence du fichier
    fs.exists(filePath,function(exists){
        if(exists){
            fs.readFile(filePath,function(err,contents){
                if(!err){
                    //si il n'y a pas d'erreurs, envoie 200/ok header
                    res.writeHead(200,{
                        "Content-type" : mimeType,
                        "Content-Length" : contents.length
                    });
                    res.end(contents);
                } else {
                    //pour debug
                    console.dir(err);
                };
            });
        } else {
            //si le fichier n'existe pas, envoie de la page 404
            fs.readFile(page404,function(err,contents){
                if(!err){
                    //envoi de la page avec le 404/not found header 
                    res.writeHead(404, {'Content-Type': 'text/html'});
                    res.end(contents);
                } else {
                    //debug
                    console.dir(err);
                };
            });
        };
    });
};
 
// fonction de gestion des requêtes HTTP
function handler(req, res) {
    var
    fileName = path.basename(req.url) || 'index.html',
    ext = path.extname(fileName),
    localFolder = __dirname + '/',
    page404 = localFolder + '404.html';
 
    //test du support de l'extention du fichier
    if(!extensions[ext]){
        //si n'est pas supporté, envoie de la page 404
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end("<html><head></head><body>The requested file type is not supported</body></html>");
    };
 
    getFile((localFolder + fileName),res,page404,extensions[ext]);
};



//creation du websocket (socket.io)
io.sockets.on('connection', function (socket) {
  // pour debug lors de la création du WebSocket
  socket.emit('news', { hello: 'world' });
  socket.on('message', function (data) {
  	console.log(data);
    //traitement du message recu
  	parse.messageParsing(data);
  });
});
