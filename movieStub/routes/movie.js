const express = require('express');
const router = express.Router();
const HttpStatus = require('literal-http-status');

const prey = {
    id: 766507,
    results: [
        {
            iso_639_1: "en",
            iso_3166_1: "US",
            name: "It's Coming Clip",
            key: "br5cxQXKtuc",
            site: "YouTube",
            size: 1080,
            type: "Clip",
            official: true,
            published_at: "2022-08-08T19:00:29.000Z",
            id: "62f160bf880c92007f179721"
        },
        {
            iso_639_1: "en",
            iso_3166_1: "US",
            name: "Now Streaming on Hulu",
            key: "GiVHPfJMbpQ",
            site: "YouTube",
            size: 1080,
            type: "Teaser",
            official: true,
            published_at: "2022-08-06T18:59:18.000Z",
            id: "62ef970ed207f300918388b4"
        },
        {
            iso_639_1: "en",
            iso_3166_1: "US",
            name: "Tracking Predator",
            key: "KUFuttMFXv4",
            site: "YouTube",
            size: 1080,
            type: "Teaser",
            official: true,
            published_at: "2022-08-04T16:20:21.000Z",
            id: "62edb897514c4a007f8a6828"
        },
        {
            iso_639_1: "en",
            iso_3166_1: "US",
            name: "First Time On Earth Featurette",
            key: "3sEC8JkDoRk",
            site: "YouTube",
            size: 1080,
            type: "Featurette",
            official: true,
            published_at: "2022-08-03T20:52:35.000Z",
            id: "62eb51c248333a0059fb548d"
        },
        {
            iso_639_1: "en",
            iso_3166_1: "US",
            name: "Legacy Featurette",
            key: "p6mihTmEuD8",
            site: "YouTube",
            size: 1080,
            type: "Behind the Scenes",
            official: true,
            published_at: "2022-08-01T19:32:49.000Z",
            id: "62e87c3e357c000058d52eb0"
        },
        {
            iso_639_1: "en",
            iso_3166_1: "US",
            name: "Hunt On Earth",
            key: "JS6vdG03Rk0",
            site: "YouTube",
            size: 1080,
            type: "Teaser",
            official: true,
            published_at: "2022-07-21T17:00:11.000Z",
            id: "62da0a971c6aa7004c9eb691"
        },
        {
            iso_639_1: "en",
            iso_3166_1: "US",
            name: "Can't Miss",
            key: "-yuV9w6Ajkk",
            site: "YouTube",
            size: 1080,
            type: "Teaser",
            official: true,
            published_at: "2022-07-18T22:07:00.000Z",
            id: "62d5e1fd50733c004c141341"
        },
        {
            iso_639_1: "en",
            iso_3166_1: "US",
            name: "First Hunt",
            key: "30ks2k0f1AI",
            site: "YouTube",
            size: 1080,
            type: "Teaser",
            official: true,
            published_at: "2022-06-08T18:13:22.000Z",
            id: "62a0e7847e12f06e077afe24"
        },
        {
            iso_639_1: "en",
            iso_3166_1: "US",
            name: "Official Trailer",
            key: "wZ7LytagKlc",
            site: "YouTube",
            size: 1080,
            type: "Trailer",
            official: true,
            published_at: "2022-06-07T14:00:22.000Z",
            id: "629f61d312197e39cd364d0b"
        },
        {
            iso_639_1: "en",
            iso_3166_1: "US",
            name: "Teaser",
            key: "7HGqcifonvs",
            site: "YouTube",
            size: 1080,
            type: "Teaser",
            official: true,
            published_at: "2022-05-16T13:00:51.000Z",
            id: "62825488873f006bb3a69e32"
        }
    ]
}

router.get('/:id/videos', async function (req, res ){
   res.status(HttpStatus['OK']).json(prey);
});

module.exports = router;