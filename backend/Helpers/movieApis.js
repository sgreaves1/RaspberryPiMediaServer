const request = require('request-promise');
const https = require('https');

const movieDBKey = 'b02a817eb883ed35a6d2104bb1555775';
const url = "https://api.themoviedb.org/3";

async function getShows(videos) {
    let showIds = videos.episodes.map(x => {return x.show_id});

    let shows = showIds.map(async function (id) {
        return await videoInfoByIdRequest("tv", id);
    });

    return Promise.all(shows);
}

async function sortVideoTypes(videos) {
    let info = { movies: [], People: [], shows: [], seasons: [], episodes: [] };

    info.movies = videos.filter(video => { if (video) return video.type === "movie"});
    info.episodes = videos.filter(video => { if (video) return video.type === "episode"});

    return info;
}

async function getVideoInfoByImdbIds(imdbIds) {
    try {
        let moviePromises = imdbIds.map(async function(id) {
           let results = await videoInfoByImdbIdRequest(id);

           if (results['movie_results'].length > 0) {
               results['movie_results'][0].type='movie';
               results['movie_results'][0].imdb_id=id;
               return results['movie_results'][0];
           }

            if (results['tv_episode_results'].length > 0) {
                results['tv_episode_results'][0].type='episode';
                results['tv_episode_results'][0].imdb_id=id;
                return results['tv_episode_results'][0];
            }
        });

        return Promise.all(moviePromises);
    }
    catch (error) {
        console.log(`Error finding videos, The Movie DB`);
        console.log(error);
    }
}

async function videoInfoByImdbIdRequest(video) {
    try {
        let options = {
            uri: `${url}/find/${video}?api_key=${movieDBKey}&language=en-US&external_source=imdb_id`,
            json: true
        };

        return request(options);
    }
    catch (error) {
        console.log(`Error finding ${video}, The Movie DB`);
        console.log(error);
    }
}

async function videoInfoByIdRequest(type, videoId) {
    try {
        let options = {
            uri: `${url}/${type}/${videoId}?api_key=${movieDBKey}&language=en-US`,
            json: true
        };
        return request(options);
    }
    catch (error) {
        console.log(`Error finding ${video}, The Movie DB`);
        console.log(error);
    }
}

async function getPopularVideos() {
    try {
        const popularPagePromises = [];

        for (let i=1; i < 10; i++) {
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
        let options = {
            uri: `${url}/discover/movie?api_key=${movieDBKey}&Language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}`,
            json: true
        };

        return request(options);
    }
    catch (error) {
        console.log(`Error finding popular videos page ${pageNumber}, The Movie DB`);
        console.log(error);
    }
}

async function matchOwnedAndRequested(filmsList, ownedVideos, requestedVideos) {

    filmsList = filmsList.map(async function(page) {

        films = page.map(async function(film) {

            film.owned = ownedVideos.includes(film.imdb_id);
            film.isRequested = requestedVideos.includes(film.imdb_id);

            return film;

        });

        return Promise.all(films);
    });

    return Promise.all(filmsList);
}

async function getVideosImdbIds(videos) {
    videos = await videos.map(async function(page) {
        let films = page.results.map(async function(film) {
            let info = await getVideoByIds(film.id);

            film.imdb_id = info.imdb_id;

            return film;
        });

        return Promise.all(films);
    });

    return Promise.all(videos);
}

async function getVideoByIds(videoId) {
    try {
        return await videoInfoByIdRequest("movie", videoId);
    }
    catch (error) {
        console.log(`Error finding videos, The Movie DB`);
        console.log(error);
    }
}

module.exports = {getVideoInfoByImdbIds, sortVideoTypes, getVideosImdbIds, getPopularVideos, matchOwnedAndRequested, getShows};