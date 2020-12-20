const request = require('request-promise');
const https = require('https');
var fs = require('fs');
const {getKey} = require('../Helpers/commandLineArgs');

const movieDBKey = 'b02a817eb883ed35a6d2104bb1555775';
const url = "https://api.themoviedb.org/3";
const omdbUrl = "http://omdbapi.com/";

async function getImagesAndBackdrops(type, id) {
    try {
        let options = {
            uri: `${url}/${type}/${id}/images?api_key=${movieDBKey}`,
            json: true
        };

        return request(options);
    }
    catch (error) {
        console.log(`Error finding images for ${id}, The Movie DB`);
        console.log(error);
    }
}

async function getShows(videos) {
    let showIds = videos.episodes.map(x => {return x.show_id});

    let uniqueShowIds = showIds.filter(function(elem, pos) {
        return showIds.indexOf(elem) == pos;
    });

    let shows = uniqueShowIds.map(async function (id) {
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
            try {
                let results = await videoInfoByImdbIdRequest(id);

                if (results){
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
                }
            }
            catch (e) {
                console.log(e);
            }

        });

        return Promise.all(moviePromises);
    }
    catch (error) {
        console.log(`Error finding videos, The Movie DB`);
        console.log(error);
    }
}

async function sortVideos(videos) {
    let films = videos['movies'];

    let result = films.sort((a, b) => new Date(b.release_date) - new Date(a.release_date))

    videos['movies'] = result;

    return videos;
}

async function enrichVideoInfo(videos) {
    try {
    videos = videos.map(async function(video) {
        if (video) {
            if (video.imdb_id)
                video.extraData = await videoFromOmdb(video.imdb_id);
            else
                video.extraData = null;
        }
        return video;
    });

    return Promise.all(videos);

    } catch (error) {
        console.log(`Error enriching videos, Open Movie Database`);
        console.log(error);
    }
}

async function getVideoTrailerKeys(videos) {
    try {
        videos = videos.map(async function(video) {
            if (video) {
                if (video.id && video.type == "movie")
                    video.trailerKeys = await videoTrailersInfo(video.imdb_id);
                else
                    video.trailerKeys = null;
            }
            return video;
        });

        return Promise.all(videos);

    } catch (error) {
        console.log(`Error getting trailers, Open Movie Database`);
        console.log(error);
    }
}

async function videoInfoByImdbIdRequest(video) {
    try {
        if (video !== "") {
            let options = {
                uri: `${url}/find/${video}?api_key=${movieDBKey}&language=en-US&external_source=imdb_id`,
                json: true
            };

            return request(options);
        }
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

async function videoFromOmdb(id) {
    try {
        let options = {
            uri: `${omdbUrl}/?i=${id}&plot=full&apikey=${getKey()}`,
            json: true
        };
        return request(options);
    } catch (error) {
        console.log(`Error finding ${id}, Open Movie Database`);
        console.log(error);
    }
}

async function videoTrailersInfo(imdb_id) {
    try {
        let options = {
            uri: `${url}/movie/${imdb_id}/videos?api_key=${movieDBKey}`,
            json: true
        };
        return request(options);

    } catch (error) {
        console.log(`Error finding trailers for ${id}, Open Movie Database`);
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

async function getTrendingVideos() {
    try {
        let options = {
            uri: `${url}/trending/movie/day?api_key=${movieDBKey}`,
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

async function getBackdrops(videos, type) {
    videos = videos.map(async function(video) {
        video.images = await getImagesAndBackdrops(type, video.id);
        return video;
    });

    return Promise.all(videos);
}

async function getBackdropsAndImages(videos) {
    try {
        videos.movies = await getBackdrops(videos.movies, "movie");
        videos.shows = await getBackdrops(videos.shows, "tv");

        return videos;
    } catch (error) {
        console.log(`Error finding images and backdrops, The Movie DB`);
        console.log(error);
    }
}

var download = function(uri, filename, callback){
    request.head(uri, function(err, res, body){
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};

async function downloadPosters(videos) {
    try {
        let current = 0;

        for(let video of videos.movies) {
            if (!fs.existsSync(`public/images/posters/${video.id}.jpg`)) {
                await request(`https://image.tmdb.org/t/p/original/${video.poster_path}`)
                    .pipe(fs.createWriteStream(`public/images/posters/${video.id}.jpg`));
                current ++;
            }
        }

        for (let video of videos.shows) {
            if (!fs.existsSync(`public/images/posters/${video.id}.jpg`)) {
                await request(`https://image.tmdb.org/t/p/original/${video.poster_path}`)
                    .pipe(fs.createWriteStream(`public/images/posters/${video.id}.jpg`));
                current ++;
            }
        }

        console.log(`${current} Posters added`);
    }
    catch (error) {
        console.log(`Error finding images and backdrops, The Movie DB`);
        console.log(error);
    }
}

async function getCastForMovie(id) {
    try {
        let options = {
            uri: `${url}/movie/${id}/credits?api_key=${movieDBKey}`,
            json: true
        };
        return request(options);
    } catch (error) {
        console.log(`Error finding credits, The Movie DB`);
        console.log(error);
    }
}

async function getActor(id) {
    try {
        let options = {
            uri: `${url}/person/${id}?api_key=${movieDBKey}&language=en-US`,
            json: true
        };
        return request(options);
    } catch (error) {
        console.log(`Error finding actor, The Movie DB`);
        console.log(error);
    }
}

async function getActorsFilmList(id) {
    try {
        let options = {
            uri: `${url}/person/${id}/movie_credits?api_key=${movieDBKey}&language=en-US`,
            json: true
        };
        return request(options);
    } catch (error) {
        console.log(`Error finding actor, The Movie DB`);
        console.log(error);
    }
}

module.exports = {getVideoInfoByImdbIds, sortVideos, sortVideoTypes, getVideosImdbIds, getPopularVideos, getTrendingVideos, matchOwnedAndRequested, getShows, getBackdropsAndImages, downloadPosters, enrichVideoInfo, getVideoTrailerKeys, getCastForMovie, getActor, getActorsFilmList};