'use strict'

const NewsApi = require('newsapi');
const newsapi = new NewsApi('');

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