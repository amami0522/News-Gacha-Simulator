'use strict'

const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const qs = require('querystring');
const server = http.createServer();
var template = fs.readFileSync(__dirname + '/views/index.ejs', 'utf-8');
const port = 8080;

var posts = [];

function renderForm(posts, res){
    var data = ejs.render(template, {
        posts: posts
    });
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
};

server.on('request', function(req, res){
    fs.readFile(__dirname + '/views/index.html', 'utf-8', function(err, data){
        if(req.method === 'POST'){
            req.data = "";
            req.on('readable', function(){
                req.data += req.read();
            });
            req.on('end', function() {
                var query = qs.parse(req.data);
                if(query.content !== "") posts.push(query.content);
                renderForm(posts, res);
            });
        }
        else{
            renderForm(posts, res);
        }
    });
});

server.listen(port, function(){
    console.log('Listening on ' + port);
});