const express = require('express');
const router = express.Router();
const HttpStatus = require('literal-http-status');
const fs = require('fs');
const pathToFilms = '../../../../media/pi/OS/Films';
// const pathToFilms = '../Films';

const contentTypes = [
    {name: ".mkv", contentType: "x-matroska"},
    {name: ".mp4", contentType: "video/mp4"}
];


async function getFilmsList() {
    let films = [];

    fs.readdirSync(pathToFilms).forEach(file =>  {
                films.push(file);
            }
        );

    return films;
}

function getContentType(filmType) {
    for (let i =0;i<contentTypes.length;i++) {
        if (contentTypes[i].name === filmType) {
            return contentTypes[i].contentType;
        }
    }
}

router.get('/:film', async function (req, res) {
    const filmFile = pathToFilms + "/" + req.params.film;
    const filmType = req.params.film.substring(req.params.film.indexOf('.'), req.params.film.length);
    const contentType = getContentType(filmType);
    console.log(filmType);
    console.log(contentType);
    const stat = fs.statSync(filmFile);
    const fileSize = stat.size;
    const range = req.headers.range;

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
            'Content-Type': contentType,
        }

        res.writeHead(206, head)
        file.pipe(res)
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': contentType,
        }
        res.writeHead(200, head)
        fs.createReadStream(filmFile).pipe(res)
    }
});

router.get('/', async function (req, res) {
    res.status(HttpStatus['OK']).json(await getFilmsList());
});

module.exports = router;