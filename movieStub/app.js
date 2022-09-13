let express = require('express');
let bodyParser = require('body-parser');

let app = express();

const findRoute = require('./routes/find');
const omdbRoute = require('./routes/omdb');

app.use(express['static'](__dirname ));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/', omdbRoute);
app.use('/find', findRoute);

app.listen(65535);

