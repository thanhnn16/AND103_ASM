const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const jwt = require('jsonwebtoken');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../userModel');

passport.use(new LocalStrategy(
    {
        usernameField: 'phoneNumber',
        passwordField: 'password',
        passReqToCallback: true
    },
    function (req, phoneNumber, password, done) {
        User.findOne({phoneNumber: phoneNumber}).then(function (user) {
            if (!user) {
                return done(null, false);
            }
            if (!user.validPassword(password)) {
                return done(null, false);
            }
            return done(null, user);
        }).catch(function (error) {
            return done(error);
        });
    }
));

function login(req, res, next) {
    User.findOne({phoneNumber: req.body.phoneNumber}).then(function (user) {
        if (!user) {
            return res.send({status: 'not_found', message: 'User not found'});
        }
        if (!user.validPassword(req.body.password)) {
            return res.send({status: 'invalid', message: 'Invalid password'});
        }
        const token = user.generateJWT();
        return res.send({status: 'success', message: 'User logged in', user: user});
    }).catch(function (error) {
        return next(error);
    });
}

module.exports = login;
