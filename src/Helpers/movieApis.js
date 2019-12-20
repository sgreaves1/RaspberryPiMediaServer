const movieDBKey = 'b02a817eb883ed35a6d2104bb1555775';
const key = '43e4a901';

export const SelectionType = {
    all: 'all',
    movies: 'movies',
    series: 'series',
    discover: 'discover',
    requested: 'requested',
    suggest: 'suggest'
};


async function getMovieDetailsFromMoviedbid(video) {
    let result = await fetch(`https://api.themoviedb.org/3/movie/${video.id}?api_key=${movieDBKey}&language=en-US`)
        .then(res => res.json());

    video.imdb_id = result.imdb_id;

    return video;
}

export async function isOwned(video) {
    let owned = await fetch('videos/')
        .then(res => res.json());

    return await owned.filter(e => e.split(".")[0] === video.imdb_id).length > 0;
}

export function isRequested(video) {

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



