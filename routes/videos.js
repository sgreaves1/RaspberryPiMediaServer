const express = require('express');
const router = express.Router();
const HttpStatus = require('literal-http-status');
const fs = require('fs');
const pathToFilms = '../../../../media/pi/OS/Films';

router.get('/video', async function (req, res) {
    const filmFile = pathToFilms + "/Bumblebee.mp4";
    const stat = fs.statSync(filmFile);
    const fileSize = stat.size
    const range = req.headers.range

    if (range) {
        const parts = range.replace(/bytes=/, "").split("-")
        const start = parseInt(parts[0], 10)
        const end = parts[1]
            ? parseInt(parts[1], 10)
            : fileSize-1

        const chunksize = (end-start)+1
        const file = fs.createReadStream(filmFile, {start, end})
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
        fs.createReadStream(filmFile).pipe(res)
    }
});

router.get('/videos', async function (req, res) {

    let films = [];

    fs.readdir(pathToFilms, function (err, files){

        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }

        files.forEach(function (file) {
                films.push(file);
           }
       );
    });

    res.status(HttpStatus['OK']).json(films);
});

module.exports = router;