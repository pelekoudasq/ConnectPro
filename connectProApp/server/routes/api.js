const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
var mydb;

//Connect
const connection = (closure) => {
    return MongoClient.connect('mongodb://tedSofiaGiannis:ted1506@ds231941.mlab.com:31941/connectprodb', (err, database) => {
        mydb = database.db('connectprodb');
        if (err) return console.log(err);

        closure(database);
    });
};

//Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

//Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

//Get users
router.get('/users', (req, res) =>{
    connection((database) => {
        mydb.collection('Users')
            .find()
            .toArray()
            .then((users) => {
                response.data = users;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

module.exports = router;
