//bring express and body-parser module from node_modules
const express = require('express');
const bodyParser = require('body-parser');
//system module
const path = require('path');
const http = require('http');
const cors = require('cors');
const app = express();

//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);


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
app.use(bodyParser.urlencoded({extended: false}));


//API location
app.use('/api', api);

//Send all other requests to the Angular App
//app.get('*', (req, res) =>  {
//    res.sendFile(path.join(__dirname, 'dist/index.html'))
//});
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));
