const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = new mongoose.Schema({
    phoneNumber: {
        type: String, required: true,
    },
    role: {
        type: String, required: true, default: 'user',
    },
    password: {
        type: String, required: true,
    },
    token: {
        type: String,
    },
    avatar: {
        type: String, required: false,
    },
    info: {
        fullName: {
            type: String, required: true, default: 'Khách'
        },
        dob: {
            type: String, required: false,
        },
        gender: {
            type: Number, required: false,
        },
        address: {
            type: String, required: false,
        },
    },
}, {timestamps: true});

User.methods.setPassword = function (password) {
    this.password = bcrypt.hashSync(password, 10);
}


User.methods.generateJWT = function () {
    return jwt.sign({
        email: this.email, phoneNumber: this.phoneNumber, role: this.role,
    }, 'secret key');
}

User.methods.setToken = function () {
    this.token = this.generateJWT();
}

User.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', User);
