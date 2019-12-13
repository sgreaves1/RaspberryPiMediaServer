const fs = require('fs');
//const pathToFilms = '../../../../media/pi/OS/Films';
const pathToFilms = 'Videos';

async function getVideoFiles() {
    let films = [];

    fs.readdirSync(pathToFilms).forEach(file =>  {
            films.push(file.split(`.`)[0]);
        }
    );

    return films;
}

module.exports = {getVideoFiles}