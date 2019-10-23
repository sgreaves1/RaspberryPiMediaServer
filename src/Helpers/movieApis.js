const movieDBKey = 'b02a817eb883ed35a6d2104bb1555775';
const key = '43e4a901';

export const SelectionType = {
    all: 'all',
    movies: 'movies',
    series: 'series',
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
    console.log(video);
    console.log(show);
    await SetHaveEpisode(show, video.Season, video.Episode);
    return show;
}

async function addShowId(show) {
    return await fetch('https://api.themoviedb.org/3/find/' + show.imdbID + '?api_key=' + movieDBKey + '&language=en-US&external_source=imdb_id')
        .then(res => res.json())
        .then(json => { console.log(json); console.log(show.showid); show.showid = json.tv_results[0].id; return show});
}

async function getFirstTrailer(id, show, type) {
    return await fetch('https://api.themoviedb.org/3/' + type + '/' + id + '/videos?api_key=' + movieDBKey + '&language=en-US')
        .then(res => res.json())
        .then(json => {
            {
                if (json.results.length > 0) {
                    show.youtubeKey = json.results[0].key
                }
                return show;
            }
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

    console.log(seasonNumber);
    console.log(episodeNumber);

    console.log(show);

    for (let i = 0; i < show.seasons.length; i++) {
        if (show.seasons[i].number === seasonNumber) {
            for (let j = 0; j < show.seasons[i].episodes.length; j++) {
                console.log(show.seasons[i].episodes[j]);
                if (show.seasons[i].episodes[j].episode_number === episodeNumber) {
                    show.seasons[i].episodes[j].enabled = true;
                    return;
                }
            }
        }
    }
}

async function appendStillPath(imageName) {
    return "https://image.tmdb.org/t/p/original"+ imageName +"?api_key=" + movieDBKey;
}

export async function  getVideoInfo(imdbId) {
    return await fetch('http://omdbapi.com/?plot=full&apikey=' + key + '&i=' + imdbId)
        .then(res => res.json());
}



