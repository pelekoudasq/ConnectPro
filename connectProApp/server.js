//bring express and body-parser module from node_modules
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//system module
const path = require('path');
const http = require('http');
const cors = require('cors');

const jwt = require('./server/routes/jwt');


//Set Port
const port = 3000;

//API file for interacting with mongoDB
const api = require('./server/routes/api');

//View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//Set Static Folder (client) //Angulat DISt output folder
app.use(express.static(path.join(__dirname, 'client')));

//Body Parsers middle ware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(jwt());

//API location
app.use('/api', api);

app.listen(port, function(){
    console.log('Server started on port '+port);
})


/*app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200/');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});*/
