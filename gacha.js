'use strict'

const express = require('express');
const app = express();
const NewsApi = require('newsapi');
const newsapi = new NewsApi('71a614c0ed5046f4ad28a1a242543879');

app.get("/", (req, res) => {
    newsapi.v2.topHeadlines({
        country: 'jp',
        pageSize: '100'
    }).then(content => res.send(content));
});

const content = document.getElementById('content');