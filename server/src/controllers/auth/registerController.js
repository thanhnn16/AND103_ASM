const User = require('../../models/UserSchema');
const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;


function register(req, res) {
    const newUser = new User({ phoneNumber: req.body.phoneNumber });
    newUser.setPassword(req.body.password);

    newUser.setToken();
    newUser.save().then(function () {
        res.send('User registered');
    }).catch(function () {
        res.send('Error');
    });

}



module.exports = register;
