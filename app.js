'use strict'
const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const NewsApi = require('newsapi');
const newsapi = new NewsApi('*****');
const server = http.createServer();
const template = fs.readFileSync(__dirname + '/views/index.ejs', 'utf-8');

var content = [];
var rank = [];

server.on('request', function(req, res){
    fs.readFile(__dirname + '/views/index.ejs', 'utf-8', function(err, data){
        if(err){
            res.writeHead(404, {'Content-Typr': 'text/plain'});
            return res.end('Not Found');
        }
        if(req.method === 'POST'){
            req.on('readable', function(){
            }).on('end', function() {
                content = [];
                rank = [];
                newsapi.v2.topHeadlines({
                    country: 'jp',
                    pageSize: '100',
                    page: '1'
                }).then(function(news){
                    news['articles'].forEach(function(item){
                        var tmp = Math.ceil(Math.random() * 100);
                        content.push(item);
                        rank.push(tmp);
                    });
                }).then(function(){
                    const rand = shuffle(content);
                    renderForm(rand, rank, res);
                });
            });
        }
        else{
            renderForm(content, rank, res);
        }
    });
});

function renderForm(data, rank, res){
    var data = ejs.render(template, {
        content: data,
        rare: rank
    });
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
};

const shuffle = ([...array]) => {
    for(let i = array.length - 1; i >= 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const port = process.env.PORT || 8000;

server.listen(port, function(){
    console.log('Listening on ' + port);
});