var http = require('http');
var express = require('express');
const fs = require('fs')

var app = express();

var inputs = [{ pin: '11', gpio: '17', value: 1 },
    { pin: '12', gpio: '18', value: 0 }];

app.use(express['static'](__dirname ));

// Express route for incoming requests for a customer name
app.get('/inputs/:id', function(req, res) {
    res.status(200).send(inputs[req.params.id]);
});

app.get('/video', function(req, res) {
    const path = '../../Downloads/Santa Clarita Diet/Season 3/Episode5.mp4'
    const stat = fs.statSync(path)
    const fileSize = stat.size
    const range = req.headers.range

    if (range) {
        const parts = range.replace(/bytes=/, "").split("-")
        const start = parseInt(parts[0], 10)
        const end = parts[1]
            ? parseInt(parts[1], 10)
            : fileSize-1

        const chunksize = (end-start)+1
        const file = fs.createReadStream(path, {start, end})
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        }

        res.writeHead(206, head)
        file.pipe(res)
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        }
        res.writeHead(200, head)
        fs.createReadStream(path).pipe(res)
    }
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

app.listen(3000);
console.log('App Server running at port 3000');
