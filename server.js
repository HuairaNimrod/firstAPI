var express = require('express');
var bodyParser = require('body-parser');
var mongodb = require('./db/connect');

const port = process.env.PORT || 8080;
var app =  express();

app
    .use(bodyParser.json())
    .use((req, res, next)=>{
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    })
    .use('/', require('./routes'));

mongodb.initDb((err, mongodb) =>{
    if(err){
        console.log(err);
    }
    else{
        app.listen(port);
        console.log(`Connected to DB and listening on ${port}`);
    }
});