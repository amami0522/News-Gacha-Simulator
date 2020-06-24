'use strict'

const http = require('http');
const fs = require('fs');
const port = 8000;

const server = http.createServer(function(req, res){
    fs.readFile('index.html', 'utf-8', function(error, data){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    });
});

server.listen(port, function(){
    console.log('Listening on ' + port);
});