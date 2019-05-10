const movieDBKey = 'xxxx';
const key = 'xxxx';

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
                return null
            }
        }
        let show = await getVideoInfo(video.seriesID);
        show = await addShowId(show);
        show = await getFirstTrailer(show.showid, show, 'tv');
        return show;
}

async function addShowId(show) {
    return await fetch('https://api.themoviedb.org/3/find/' + show.imdbID + '?api_key=' + movieDBKey + '&language=en-US&external_source=imdb_id')
        .then(res => res.json())
        .then(json => { show.showid = json.tv_results[0].id; return show});
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

export async function  getVideoInfo(imdbId) {
    return await fetch('http://omdbapi.com/?plot=full&apikey=' + key + '&i=' + imdbId)
        .then(res => res.json());
}



