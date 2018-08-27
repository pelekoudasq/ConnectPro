const expressJwt = require('express-jwt');
const config = require('./config.json');
const services = require('./api');
//const userService = require('../users/user.service');

module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/api/login',
            '/api/register'
        ]
    });
}

async function isRevoked(req, payload, done) {
    console.log(payload+ ' '+ payload.sub);
    const user = await services.getById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
};
