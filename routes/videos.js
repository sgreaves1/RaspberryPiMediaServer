const express = require('express');
const router = express.Router();
const HttpStatus = require('literal-http-status');

router.get('/video', async function (request, response) {
    const path = '../../Downloads/Santa Clarita Diet/Season 3/Bumblebee.mp4'
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

router.get('/gamercard', async function (request, response) {
    response.status(HttpStatus['OK']).json(await xboxAPI.getXboxGamercard());
});

router.get('/presence', async function (request, response) {
    response.status(HttpStatus['OK']).json(await xboxAPI.getXboxPresence());
});

router.get('/title-history', async function (request, response) {
    response.status(HttpStatus['OK']).json(await xboxAPI.getXboxTitleHistory());
});

module.exports = router;