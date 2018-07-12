const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');
var db = mongojs('mongodb://tedSofiaGiannis:ted1506@ds231941.mlab.com:31941/connectprodb', ['Users']);

//Get ALL users
router.get('/users', function(req, res, next){
    db.Users.find(function(err, users){
        if(err){
            res.send(err);
        }
        res.json(users);
    });
});

//Get single user
router.get('/user/:id', function(req, res, next){
    db.Users.findOne({_id: mongojs.ObjectID(req.params.id)}, function(err, user){
        if(err){
            res.send(err);
        }
        res.json(user);
    });
});

//Save a new users
router.post('/users', function(req, res, next){
    var user = req.body;
    if(!user.password){
        res.status(400);
        res.json({
            "error": "Bad data"
        });
    } else {
        db.Users.save(user, function (err, user){
            if(err){
                res.send(err);
            }
            res.json(user);
        })
    }
});

//Delete single user
router.delete('/user/:id', function(req, res, next){
    db.Users.remove({_id: mongojs.ObjectID(req.params.id)}, function(err, user){
        if(err){
            res.send(err);
        }
        res.json(user);
    });
});

//update single users
router.put('/user/:id', function(req, res, next){

    var user = req.body;
    var updUser = {};

    if(user.password){
        updUser.password = user.password;
    }

    if(!updUser){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.Users.update({_id: mongojs.ObjectID(req.params.id)},updUser, {}, function(err, user){
            if(err){
                res.send(err);
            }
            res.json(user);
        });
    }
});

module.exports = router;
