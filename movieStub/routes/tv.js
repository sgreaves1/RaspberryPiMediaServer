const express = require('express');
const router = express.Router();
const HttpStatus = require('literal-http-status');

const houseOfDragon = {
    adult: false,
    backdrop_path: "/Aa9TLpNpBMyRkD8sPJ7ACKLjt0l.jpg",
    created_by: [
        {
            id: 237053,
            credit_id: "5db8d867a1d3320011e7ddf1",
            name: "George R. R. Martin",
            gender: 2,
            profile_path: "/1A7W0L9dZz0rCN1oj6h8YUvusdN.jpg"
        },
        {
            id: 1167458,
            credit_id: "5db8d8fe3faba000163a83cb",
            name: "Ryan Condal",
            gender: 2,
            profile_path: "/ohS1LQEw1aYccD6mxUhWGXc7glz.jpg"
        }
    ],
    episode_run_time: [
        62
    ],
    first_air_date: "2022-08-21",
    genres: [
        {
            id: 10765,
            name: "Sci-Fi & Fantasy"
        },
        {
            id: 18,
            name: "Drama"
        },
        {
            id: 10759,
            name: "Action & Adventure"
        }
    ],
    homepage: "https://www.hbo.com/house-of-the-dragon",
    id: 94997,
    in_production: true,
    languages: [
        "en"
    ],
    last_air_date: "2022-09-11",
    last_episode_to_air: {
        air_date: "2022-09-11",
        episode_number: 4,
        id: 3846965,
        name: "King of the Narrow Sea",
        overview: "Daemon returns to court after the successful completion of the battle. Princess Rhaenyra must deal with potential suitors in order to keep her line of succession.",
        production_code: "",
        runtime: 63,
        season_number: 1,
        show_id: 94997,
        still_path: "/2p3u9ERDrF9xx4zJtPQC6s6HKDu.jpg",
        vote_average: 8.154,
        vote_count: 13
    },
    name: "House of the Dragon",
    next_episode_to_air: {
        air_date: "2022-09-18",
        episode_number: 5,
        id: 3846967,
        name: "We Light the Way",
        overview: "",
        production_code: "",
        runtime: 60,
        season_number: 1,
        show_id: 94997,
        still_path: "/8kgv0QAfICMGPqDD2dQvO9TR3AD.jpg",
        vote_average: 0,
        vote_count: 0
    },
    networks: [
        {
            id: 49,
            name: "HBO",
            logo_path: "/tuomPhY2UtuPTqqFnKMVHvSb724.png",
            origin_country: "US"
        }
    ],
    number_of_episodes: 10,
    number_of_seasons: 1,
    origin_country: [
        "US"
    ],
    original_language: "en",
    original_name: "House of the Dragon",
    overview: "The Targaryen dynasty is at the absolute apex of its power, with more than 15 dragons under their yoke. Most empires crumble from such heights. In the case of the Targaryens, their slow fall begins when King Viserys breaks with a century of tradition by naming his daughter Rhaenyra heir to the Iron Throne. But when Viserys later fathers a son, the court is shocked when Rhaenyra retains her status as his heir, and seeds of division sow friction across the realm.",
    popularity: 8417.342,
    poster_path: "/z2yahl2uefxDCl0nogcRBstwruJ.jpg",
    production_companies: [
        {
            id: 3268,
            logo_path: "/tuomPhY2UtuPTqqFnKMVHvSb724.png",
            name: "HBO",
            origin_country: "US"
        },
        {
            id: 180956,
            logo_path: null,
            name: "Bastard Sword",
            origin_country: "US"
        },
        {
            id: 180957,
            logo_path: null,
            name: "1:26 Pictures",
            origin_country: "US"
        },
        {
            id: 180958,
            logo_path: null,
            name: "GRRM",
            origin_country: "US"
        }
    ],
    production_countries: [
        {
            iso_3166_1: "US",
            name: "United States of America"
        }
    ],
    seasons: [
        {
            air_date: "2022-08-21",
            episode_count: 10,
            id: 134965,
            name: "Season 1",
            overview: "",
            poster_path: "/z2yahl2uefxDCl0nogcRBstwruJ.jpg",
            season_number: 1
        }
    ],
    spoken_languages: [
        {
            english_name: "English",
            iso_639_1: "en",
            name: "English"
        }
    ],
    status: "Returning Series",
    tagline: "Fire and blood.",
    type: "Scripted",
    vote_average: 8.665,
    vote_count: 1113
}

router.get('/:id/', async function (req, res) {
    res.status(HttpStatus['OK']).json(houseOfDragon);
});

module.exports = router;

