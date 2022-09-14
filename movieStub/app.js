let express = require('express');
let bodyParser = require('body-parser');

let app = express();

const findRoute = require('./routes/find');
const omdbRoute = require('./routes/omdb');
const movieRoute = require('./routes/movie'); // Gets videos (i.e trailers ect)
const tvRoute = require('./routes/tv');

app.use(express['static'](__dirname ));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/', omdbRoute);
app.use('/find', findRoute);
app.use('/movie', movieRoute);
app.use('/tv', tvRoute);

app.listen(65535);

