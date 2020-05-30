let http = require('http');
let express = require('express');
let bodyParser = require('body-parser');
let schedule = require('node-schedule');
const {getVideoFiles, getRequestedVideos} = require ('./Helpers/fileReader');
const {getVideoInfoByImdbIds, sortVideoTypes, getVideosImdbIds, getPopularVideos, matchOwnedAndRequested, getShows, getBackdropsAndImages, downloadPosters, enrichVideoInfo, getVideoTrailerKeys} = require ('./Helpers/movieApis');
const {MongoClient} = require('mongodb');
const {processCommandLineArgs} = require('./Helpers/commandLineArgs');

processCommandLineArgs();

let app = express();
let videos = [];

// Routes
const videoRoute = require('./routes/videos');

app.use(express['static'](__dirname ));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/videos', videoRoute);

app.listen(3020);

console.log('App Server running at port 3020');


global.mongoClient = MongoClient.connect(`mongodb://localhost:27017/mediaserver`,{poolSize: 100, useUnifiedTopology: true}, function (error, db) {

    if (error) {
        console.error('Failed to connect to mongodb, exiting');
    }

    console.log("connected");
});

GetVideoData();
GetDiscoveryData();

// schedule.scheduleJob('10 * * * * *', GetVideoData);
// schedule.scheduleJob('10 * * * * *', GetDiscoveryData);

async function GetVideoData() {
    console.log('Getting video data!');

    try {
        let films = await getVideoFiles();
        let videos = await getVideoInfoByImdbIds(films);
        videos = await enrichVideoInfo(videos);
        videos = await getVideoTrailerKeys(videos);
        videos = await sortVideoTypes(videos);
        videos.shows = await getShows(videos);
        videos = await getBackdropsAndImages(videos);
        await downloadPosters(videos);
        app.set('videos', videos);
        console.log('Got video data!');
    } catch (error) {
        console.log("Error getting video data!");
        console.log(error);
    }
}

async function GetDiscoveryData() {
    try {
        let films = await getVideoFiles();
        let requestedList = await getRequestedVideos();
        let popularityList = await getPopularVideos();
        popularityList = await getVideosImdbIds(popularityList);
        popularityList = await matchOwnedAndRequested(popularityList, films, requestedList);
        popularityList = popularityList.flat();
        app.set('popularityList', popularityList)
        // save discover to db
    } catch (error) {
        console.log("Error getting discovery data!");
        console.log(error);
    }
}



