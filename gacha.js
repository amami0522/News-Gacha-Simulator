'use strict'

const qs = require('querystring');
const NewsApi = require('newsapi');
const newsapi = new NewsApi('71a614c0ed5046f4ad28a1a242543879');

function takeGacha(){
    var content = [];
    newsapi.v2.topHeadlines({
        country: 'jp',
        pageSize: '10',
    }).then(function(news){
        /*
        news['articles'].forEach(function(item){
            var query;
            query += qs.parse(item.title);
            content.push(query);
        });
        */
       console.log(news);
        return news;
    });
}

module.exports = {
    takeGacha
};