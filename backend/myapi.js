let http = require('http');
let express = require('express');
let bodyParser = require('body-parser');
let schedule = require('node-schedule');
const {getVideoFiles} = require ('./Helpers/fileReader');
const {getVideoInfo, getPopularVideos} = require ('./Helpers/movieApis');

let app = express();

// Routes
const videoRoute = require('./routes/videos');

app.use(express['static'](__dirname ));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/videos', videoRoute);

app.listen(3020);

console.log('App Server running at port 3020');


schedule.scheduleJob('10 * * * * *', async function(){  // this for one hour
    console.log('Getting video data!');
    let films = await getVideoFiles();
    let videos = await getVideoInfo(films).then(result => result );
    console.log(videos);
    // now save videos to the db
    let popularityList = await getPopularVideos();
    console.log(popularityList);
    // now check each video to see if we own it and if its requested by someone
    // save discover to db
});

