const expressJwt = require('express-jwt');
const config = require('./config.json');
const mongojs = require('mongojs');
const db = mongojs('mongodb://tedSofiaGiannis:ted1506@ds231941.mlab.com:31941/connectprodb');
//const userService = require('../users/user.service');

module.exports = jwt;

function jwt() {
    const secret = config.secret;
    /*return expressJwt({ secret: secret }).unless({
        path: [
            '/api/login',
            '/api/register'
        ]
    });*/
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/api/login',
            '/api/register'
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await db.Users.findById(payload.sub).select('-_id');

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
};
