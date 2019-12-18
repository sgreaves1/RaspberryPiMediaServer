const fs = require('fs');
//const pathToFilms = '../../../../media/pi/OS/Films';
const pathToFilms = 'Videos';
const lineReader = require('line-reader');
const path = require("path");

async function getVideoFiles() {
    let films = [];

    fs.readdirSync(pathToFilms).forEach(file =>  {
            films.push(file.split(`.`)[0]);
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