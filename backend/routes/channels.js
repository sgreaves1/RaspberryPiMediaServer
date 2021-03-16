const express = require('express');
const router = express.Router();
const HttpStatus = require('literal-http-status');

router.get('/', async function (req, res) {
    res.status(HttpStatus['OK']).json(req.app.get('channels'));
});


module.exports = router;