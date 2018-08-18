const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');
const bcrypt = require('bcryptjs');
const db = mongojs('mongodb://tedSofiaGiannis:ted1506@ds231941.mlab.com:31941/connectprodb', ['Users']);

const User = require('./user.model')


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

//Save a new user
router.post('/register', function(req, res, next){

    var flag = 0;
    var userParam = req.body;
    db.Users.findOne({ email: userParam.email }, function(err, user){
        if(user){
            res.send(user);
            console.log('user found '+flag);
            return;
        } else {
            console.log('about to change flag '+flag);
            flag++;
            const user = new User(userParam);

            // hash password
            if (userParam.password)
                user.password = bcrypt.hashSync(userParam.password, 10);

            // save user
            console.log('user not found '+flag);
            db.Users.save({firstName: user.firstName, lastName: user.lastName, email: user.email, password: user.password});
        }
    });
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
