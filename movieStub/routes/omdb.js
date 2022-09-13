const express = require('express');
const router = express.Router();
const HttpStatus = require('literal-http-status');

const prey = {
    Title: "Prey",
    Year: "2022",
    Rated: "R",
    Released: "05 Aug 2022",
    Runtime: "99 min",
    Genre: "Action, Adventure, Drama",
    Director: "Dan Trachtenberg",
    Writer: "Patrick Aison, Dan Trachtenberg, Jim Thomas",
    Actors: "Amber Midthunder, Dakota Beavers, Dane DiLiegro",
    Plot: "The origin story of the Predator in the world of the Comanche Nation 300 years ago. Naru, a skilled warrior, fights to protect her tribe against one of the first highly-evolved Predators to land on Earth.",
    Language: "English, North American Indian, French",
    Country: "United States",
    Awards: "N/A",
    Poster: "https://m.media-amazon.com/images/M/MV5BMDBlMDYxMDktOTUxMS00MjcxLWE2YjQtNjNhMjNmN2Y3ZDA1XkEyXkFqcGdeQXVyMTM1MTE1NDMx._V1_SX300.jpg",
    Ratings: [
        {
            Source: "Internet Movie Database",
            Value: "7.2/10"
        },
        {
            Source: "Rotten Tomatoes",
            Value: "93%"
        },
        {
            Source: "Metacritic",
            Value: "71/100"
        }
    ],
    Metascore: "71",
    imdbRating: "7.2",
    imdbVotes: "105,342",
    imdbID: "tt11866324",
    Type: "movie",
    DVD: "05 Aug 2022",
    BoxOffice: "N/A",
    Production: "N/A",
    Website: "N/A",
    Response: "True"
}

router.get('/', async function (req, res) {
    res.status(HttpStatus['OK']).json(prey);
});

module.exports = router;