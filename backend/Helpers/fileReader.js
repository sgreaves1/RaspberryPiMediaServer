const fs = require('fs');
const lineReader = require('line-reader');
const path = require("path");
const {getVideosFolder} = require('./commandLineArgs');

async function getVideoFiles() {
    let films = [];

    let pathToFilms = getVideosFolder();
    //let hddDetails = getHddDetails();
    fs.readdirSync(pathToFilms).forEach(file =>  {
            films.push({
                "id" : file.split(`.`)[0],
                "hddName" : "OS1"
            });
        }
    );

    return films;
}

async function getRequestedVideos() {
    try {
        let paths = path.join(__dirname, "../..", "Data/Requested.txt");

        return fs.readFileSync(paths, 'utf8').split("\n");

    } catch (error) {
        console.log("Failed to get requested videos!");
        console.log(error);
    }
}

module.exports = {getVideoFiles, getRequestedVideos}