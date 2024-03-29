const express = require('express');
const router = express.Router();
const HttpStatus = require('literal-http-status');
const fs = require('fs');
const {getVideosFolder, getPublicIp} = require('../Helpers/commandLineArgs');
const {getCastForMovie, getActor, getActorsFilmList, getTrendingVideos} = require ('../Helpers/movieApis');
const {getVideoInfoByImdbIds, videosToKodi, sortVideos, sortVideoTypes, getShows, getBackdropsAndImages, downloadPosters, enrichVideoInfo, getVideoTrailerKeys} = require ('../Helpers/movieApis');

async function getFilmsList() {
    let films = [];

    let pathToFilms = getVideosFolder();
    fs.readdirSync(pathToFilms).forEach(file =>  {
                films.push(file);
            }
        );

    return films;
}

router.get('/new/', async function (req, res) {
    res.status(HttpStatus['OK']).json(req.app.get('videos'));
});

router.get('/kodi/', async function (req, res) {
    res.status(HttpStatus['OK']).json(req.app.get('kodiVideos'));
});

router.get('/kodi/:category', async function (req, res) {
    let categories = req.app.get('kodiVideos');
    let videos = [];
    categories.forEach(cat => {
        if (cat.name === req.params.category)
            if (cat.name === "Movies")
                videos = cat.videos;
            else if (cat.name === "TV Shows")
                videos = cat.shows
    });

    res.status(HttpStatus['OK']).json(videos);
});

router.get('/new/cast/:id', async function (req, res) {
   res.status(HttpStatus['OK']).json(await getCastForMovie(req.params.id));
});

router.get('/discover', async function (req, res) {
    res.status(HttpStatus['OK']).json(req.app.get('popularityList'));
});

router.get('/trending', async function (req, res) {
    res.status(HttpStatus['OK']).json(await getTrendingVideos());
});

router.get('/update', async function (req, res) {
    let listOfFiles = await getFilmsList();
    let notLoaded = 0;
    let newIMDBIDsToAdd = [];
    let names = [];
    let videos = req.app.get('videos')

    listOfFiles.forEach(file => {
        let imdbId = file.split('.')[0];

        if (videos.movies.filter(movie => movie.imdb_id === imdbId) === undefined)
            if (videos.episodes.filter(episode => episode.imdb_id === imdbId) === undefined) {
                notLoaded++;
                newIMDBIDsToAdd.push(imdbId)
            }

    });

    if (notLoaded > 0) {
        console.log("updating video collection")
        let videosToAdd = await getVideoInfoByImdbIds(newIMDBIDsToAdd);
        videosToAdd = await enrichVideoInfo(videosToAdd);
        videosToAdd = await getVideoTrailerKeys(videosToAdd);
        videosToAdd = await sortVideoTypes(videosToAdd);
        videosToAdd = await sortVideos(videosToAdd);
        videosToAdd.shows = await getShows(videosToAdd);
        videosToAdd = await getBackdropsAndImages(videosToAdd);
        await downloadPosters(videosToAdd);

        // add videos to main videos list
        videosToAdd.movies.forEach(movie => {
            names.push(movie.original_title);
            videos.movies.push(movie);
        });
        videosToAdd.shows.forEach(show => {
            if (videos.shows.filter(s => s.id === show.id) === undefined)
                videos.shows.push(show)
        });
        videosToAdd.episodes.forEach(episode => {
            names.push(episode.season_number + "-"  + episode.episode_number + " " + episode.name);
            videos.episodes.push(episode)
        });

        app.set('videos', videos);
        let forKodi = await videosToKodi(videos);
        app.set('kodiVideos', forKodi)
    }

    res.status(HttpStatus['OK']).send({"New Files added": notLoaded, "Added": names });
});

router.get('/ip', async  function (req, res) {
    res.status(HttpStatus['OK']).json({ip: await getPublicIp()});
});

router.get('/:film', async function (req, res) {

    let pathToFilms = getVideosFolder();
    const filmFile = pathToFilms + "/" + req.params.film;
    console.log(req.params.film);

    const stat = fs.statSync(filmFile);
    const fileSize = stat.size;
    const range = req.headers.range;
    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1]
            ? parseInt(parts[1], 10)
            : fileSize-1;
        const chunksize = (end-start)+1;
        const file = fs.createReadStream(filmFile, {start, end});
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(200, head);
        fs.createReadStream(filmFile).pipe(res);
    }
});

router.get('/', async function (req, res) {
    res.status(HttpStatus['OK']).json(await getFilmsList());
});

router.get('/actor/:id', async function (req, res) {
    let actor = await getActor(req.params.id);
    let actorsFilms = await getActorsFilmList(req.params.id);
    res.status(HttpStatus['OK']).json({actorDetails: actor, FilmsList: actorsFilms});
});

module.exports = router;