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

export async function discoverPopular() {
        let movies = await fetch('videos/discover')
            .then(res => res.json());

        return movies;
}



