const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const mongojs = require('mongojs');
const bcrypt = require('bcryptjs');
const db = mongojs('mongodb://tedSofiaGiannis:ted1506@ds231941.mlab.com:31941/connectprodb');
const config = require('./config.json');

const User = require('./user.model')
const Post = require('./post.model')


//Get ALL users
router.get('/users', function(req, res, next){
    db.Users.find(function(err, users){
        if(err){
            res.send(err);
        }
        res.json(users);
    });
});

//Get ALL posts
router.get('/posts', function(req, res, next){
    db.Posts.find(function(err, posts){
        if(err){
            res.send(err);
        }
        res.send(posts);
    });
});

//Get single user
router.get('/user/:id', function(req, res, next){
    console.log('find user with id'+ req.params.id);
    db.Users.findOne({_id: mongojs.ObjectID(req.params.id)}, function(err, user){
        if(err){
            res.send(err);
        }
        res.json(user);
    });
});

async function getById(id) {
    //console.log(id);
    await db.Users.findOne({_id: id}, function(err, user){
            if(user){
                //console.log('getById: user found');
                return user;
            }
            //console.log('getById: USER NOT FOUND ' + err);
            return null;
    });
}

async function compareStuff(user, password){
    if(user){
        console.log('User with this email found');
        if (bcrypt.compareSync(password, user.password)){
            const token = jwt.sign({ sub: user.id }, config.secret); // <==== The all-important "jwt.sign" function
            const userObj = new User(user);
            const { password, ...userWithoutHash } = userObj.toObject();
            console.log('Correct password ' );
            console.log('TOKEN: '+token);
            //console.log(userObj);
            //console.log(userWithoutHash);
            return {
                ...userWithoutHash,
                token
            };
        }
    }
}

router.post('/login', function(req, res, next){
    var email, password;
    var userToSend;
    email = req.body.email;
    password = req.body.password;
    db.Users.findOne({ email: email }, function(err, user){
        compareStuff(user, password)
            .then(userRes => userRes ? res.json(userRes) : res.status(400).json({ message: 'Username or password is incorrect' }))
            .catch(err => next(err));
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
            db.Users.save({firstName: user.firstName, lastName: user.lastName, email: user.email, password: user.password, userType: user.userType});
        }
    });
});

//User posts

router.post('/newPost', function(req, res, next){
    var postParam = req.body;
    const post = new Post(postParam);
    db.Posts.save(post);
});

module.exports = {
    router: router,
    getById: getById
}
