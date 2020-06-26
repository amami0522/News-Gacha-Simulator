'use strict'
const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const NewsApi = require('newsapi');
const newsapi = new NewsApi('');
const server = http.createServer();
const template = fs.readFileSync(__dirname + '/views/index.ejs', 'utf-8');

var posts = [];
var urls = [];

function renderForm(posts, urls, res){
    var data = ejs.render(template, {
        posts: posts,
        urls: urls
    });
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
};

server.on('request', function(req, res){
    fs.readFile(__dirname + '/views/index.ejs', 'utf-8', function(err, data){
        if(err){
            res.writeHead(404, {'Content-Typr': 'text/plain'});
            return res.end('Not Found');
        }
        if(req.method === 'POST'){
            req.on('readable', function(){
            }).on('end', function() {
                newsapi.v2.topHeadlines({
                    country: 'jp',
                    pageSize: '100',
                    page: '1'
                }).then(function(news){
                    news['articles'].forEach(function(item){
                        posts.push(item.title);
                        urls.push(item.url);
                    });
                }).then(function(){
                    console.log(urls);
                    renderForm(posts, urls, res);
                });
            });
        }
        else{
            renderForm(posts, urls, res);
        }
    });
});

const port = process.env.PORT || 8080;

server.listen(port, function(){
    console.log('Listening on ' + port);
});