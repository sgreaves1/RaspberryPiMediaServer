var http = require('http');
var express = require('express');
let bodyParser = require('body-parser');

var app = express();

// Routes
const videoRoute = require('./routes/videos');

app.use(express['static'](__dirname ));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/videos', videoRoute);

app.listen(3020);
console.log('App Server running at port 3020');
