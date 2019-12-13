const request = require('request-promise');

const movieDBKey = 'b02a817eb883ed35a6d2104bb1555775';
const url = "https://api.themoviedb.org/3";

async function getVideoInfo(videos) {
    try {
        const moviePromises = [];

        for (const video of videos) {
            moviePromises.push(videoInfoRequest(video));
        }

        return Promise.all(moviePromises);
    }
    catch (error) {
        console.log(`Error finding videos, The Movie DB`);
        console.log(error);
    }
}

async function videoInfoRequest(video) {

    try {
        return request(`${url}/find/${video}?api_key=${movieDBKey}&language=en-US&external_source=imdb_id`);
    }
    catch (error) {
        console.log(`Error finding ${video}, The Movie DB`);
        console.log(error);
    }
}

async function getPopularVideos() {
    try {
        const popularPagePromises = [];

        for (let i=1; i < 20; i++) {
            popularPagePromises.push(popularVideoRequest(i));
        }

        return Promise.all(popularPagePromises);
    }
    catch (error) {
        console.log(`Error finding popular videos, The Movie DB`);
        console.log(error);
    }
}

async function popularVideoRequest(pageNumber) {
    try {
        return request(`${url}/discover/movie?api_key=${movieDBKey}&Language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}`);
    }
    catch (error) {
        console.log(`Error finding popular videos page ${pageNumber}, The Movie DB`);
        console.log(error);
    }
}

module.exports = {getVideoInfo, getPopularVideos};