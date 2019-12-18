let http = require('http');
let express = require('express');
let bodyParser = require('body-parser');
let schedule = require('node-schedule');
const {getVideoFiles, getRequestedVideos} = require ('./Helpers/fileReader');
const {getVideoInfoByImdbIds, sortVideoTypes, getVideosImdbIds, getPopularVideos, matchOwnedAndRequested} = require ('./Helpers/movieApis');
const {MongoClient} = require('mongodb');

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

// schedule.scheduleJob('10 * * * * *', GetVideos);

async function GetVideoData() {
    console.log('Getting video data!');

    try {
        let films = await getVideoFiles();
        let videos = await getVideoInfoByImdbIds(films);
        videos = await sortVideoTypes(videos);
        app.set('videos', videos);
        // let requestedList = await getRequestedVideos();
        // let popularityList = await getPopularVideos();
        // popularityList = await getVideosImdbIds(popularityList);
        // popularityList = await matchOwnedAndRequested(popularityList, films, requestedList);
        // popularityList = popularityList.flat();
        // save discover to db
        let i = 0;
    } catch (error) {
        console.log("Error getting video data!");
        console.log(error);
    }


}

