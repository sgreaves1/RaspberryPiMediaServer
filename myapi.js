var http = require('http');
var express = require('express');
const fs = require('fs')

var app = express();

var inputs = [{ pin: '11', gpio: '17', value: 1 },
    { pin: '12', gpio: '18', value: 0 }];

// Routes
const videoRoute = require('./routes/videos');

app.use(express['static'](__dirname ));

// Express route for incoming requests for a customer name
app.get('/inputs/:id', function(req, res) {
    res.status(200).send(inputs[req.params.id]);
});


// Express route for any other unrecognised incoming requests
app.get('*', function(req, res) {
    res.status(404).send('Unrecognised API call');
});

// Express route to handle errors
app.use(function(err, req, res, next) {
    if (req.xhr) {
        res.status(500).send('Oops, Something went wrong!');
    } else {
        next(err);
    }
});

app.use('/videos', videoRoute);

app.listen(3000);
console.log('App Server running at port 3000');
