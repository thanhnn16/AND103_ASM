const User = require('../userModel');
const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;

async function register(req, res) {
    const phoneNumber = req.body.phoneNumber;

    const user = await User.findOne({"phoneNumber": phoneNumber});
    if (user) {
        return res.send({status: 'not_available', message: 'User already registered'});
    }
    const newUser = new User({phoneNumber});

    newUser.setPassword(req.body.password);
    newUser.setToken();
    newUser.save().then(function () {
        res.send({status: 'success', message: 'User registered', user: newUser});
    }).catch(function (err) {
        res.send({status: 'error', message: err.message});
    });

}



module.exports = register;
