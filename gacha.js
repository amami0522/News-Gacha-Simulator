'use strict'

const NewsApi = require('newsapi');
const newsapi = new NewsApi('71a614c0ed5046f4ad28a1a242543879');

function takeGacha(){
}

var content = newsapi.v2.topHeadlines({
    country: 'jp',
    pageSize: '100',
}).then(function(news){
    news['articles'].forEach(function(item){
        console.log(item.title);
    });
});

module.exports = {
    takeGacha
};