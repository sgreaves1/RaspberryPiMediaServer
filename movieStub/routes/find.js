const express = require('express');
const router = express.Router();
const HttpStatus = require('literal-http-status');

const prey = {
            adult: false,
            backdrop_path: "/7ZO9yoEU2fAHKhmJWfAc2QIPWJg.jpg",
            id: 766507,
            title: "Prey",
            original_language: "en",
            original_title: "Prey",
            overview: "When danger threatens her camp, the fierce and highly skilled Comanche warrior Naru sets out to protect her people. But the prey she stalks turns out to be a highly evolved alien predator with a technically advanced arsenal.",
            poster_path: "/ujr5pztc1oitbe7ViMUOilFaJ7s.jpg",
            media_type: "movie",
            genre_ids: [
                53,
                28,
                878
            ],
            popularity: 3032.842,
            release_date: "2022-08-02",
            video: false,
            vote_average: 7.963,
            vote_count: 3765
        };

router.get('/:id', async function (req, res) {

    let results = {
        movie_results: [ prey ],
        person_results: [ ],
        tv_results: [ ],
        tv_episode_results: [ ],
        tv_season_results: [ ]
    };

    res.status(HttpStatus['OK']).json(results);
});

module.exports = router;