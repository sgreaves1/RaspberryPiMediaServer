const movieDBKey = 'b02a817eb883ed35a6d2104bb1555775';
const key = '43e4a901';

export const SelectionType = {
    all: 'all',
    movies: 'movies',
    series: 'series',
    discover: 'discover'
};

export async function sortVideo(video, videoFormat, films, series) {

    if (video.Type === "movie") {
        await getFirstTrailer(video.imdbID, video, 'movie');
        video.videoFormat = videoFormat;
        return video;
    }
    else if (video.Type === "episode") {
        return await addEpisodeToSeries(series, video);
    }

}

async function addEpisodeToSeries(series, video) {
    if (video && video.seriesID && video.seriesID !== 'N/A') {
        for (let i = 0; i < series.length; i++) {
            if (series[i].imdbID === video.seriesID) {
                await SetHaveEpisode(series[i], video.Season, video.Episode);
                return null
            }
        }
        let show = await getVideoInfo(video.seriesID);
        show = await addShowId(show);
        show = await getFirstTrailer(show.showid, show, 'tv');
        show.seasons = await getAllSeasons(show.showid, show.totalSeasons);
        await SetHaveEpisode(show, video.Season, video.Episode);
        return show;
    }
    return null;
}

async function addShowId(show) {
    return await fetch('https://api.themoviedb.org/3/find/' + show.imdbID + '?api_key=' + movieDBKey + '&language=en-US&external_source=imdb_id')
        .then(res => res.json())
        .then(json => {show.showid = json.tv_results[0].id; return show});
}

async function getFirstTrailer(id, show, type) {
    return await fetch('https://api.themoviedb.org/3/' + type + '/' + id + '/videos?api_key=' + movieDBKey + '&language=en-US')
        .then(res => res.json())
        .then(json => {
            if (json.results && json.results.length > 0) {
                show.youtubeKey = json.results[0].key
            }
            return show;

        });
}

async function getAllSeasons(showId, seasonsAmount) {
    let seasons = [];
    for (let i = 0; i < seasonsAmount; i++) {
        let seasonInfo = await getSeasonInfo(showId, i + 1);

        for (let i = 0; i < seasonInfo.episodes.length; i++) {
            seasonInfo.episodes[i].still_path = await appendStillPath(seasonInfo.episodes[i].still_path);
        }

        seasons.push({number: i+1, overview: seasonInfo.overview, episodes: seasonInfo.episodes});
    }

    return seasons;
}

async function getSeasonInfo(showId, seasonNumber) {
    return await fetch('https://api.themoviedb.org/3/tv/' + showId + '/season/' + seasonNumber + '?api_key=' + movieDBKey + '&language=en-US')
        .then(res => res.json())
        .then(json => {return json});
}

async function SetHaveEpisode(show, seasonNumber, episodeNumber) {
    seasonNumber = parseInt(seasonNumber);
    episodeNumber = parseInt(episodeNumber);

    for (let i = 0; i < show.seasons.length; i++) {
        if (show.seasons[i].number === seasonNumber) {
            for (let j = 0; j < show.seasons[i].episodes.length; j++) {
                if (show.seasons[i].episodes[j].episode_number === episodeNumber) {
                    show.seasons[i].episodes[j].enabled = true;
                    return;
                }
            }
        }
    }
}

async function getMovieDetailsFromMoviedbid(video) {
    let result = await fetch(`https://api.themoviedb.org/3/movie/${video.id}?api_key=${movieDBKey}&language=en-US`)
        .then(res => res.json());

    video.imdb_id = result.imdb_id;

    return video;
}

export async function isOwned(video) {
    let owned = await fetch('videos/')
        .then(res => res.json());

    let sam = "pies";

    return await owned.filter(e => e.split(".")[0] === video.imdb_id).length > 0;
}

export function isRequested(video) {

}

async function appendStillPath(imageName) {
    return "https://image.tmdb.org/t/p/original"+ imageName +"?api_key=" + movieDBKey;
}

export function imageUri(imageName) {
    return `https://image.tmdb.org/t/p/original/${imageName}`;
}

export async function  getVideoInfo(imdbId) {
    return await fetch('http://omdbapi.com/?plot=full&apikey=' + key + '&i=' + imdbId)
        .then(res => res.json());
}

export async function getImages(id, type) {
    let uri = `https://api.themoviedb.org/3/${type}/${id}/images?api_key=${movieDBKey}`;
    return await fetch(uri)
        .then(res => res.json());
}

export async function discoverPopular(page) {
        let uri = `https://api.themoviedb.org/3/discover/movie?api_key=${movieDBKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`;
        let movies = await fetch(uri)
            .then(res => res.json());

        let results = await movies.results.map(async function (movie) {
            movie = await getMovieDetailsFromMoviedbid(movie);
            movie.Owned = await isOwned(movie);
            // movie.HasBeenRequested = isRequested(movie);
        });

        return results;
}



