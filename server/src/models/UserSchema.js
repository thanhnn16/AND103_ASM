const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    email: {
        type: String, required: false,
    }, phoneNumber: {
        type: String, unique: true, required: true,
    }, password: {
        type: String, required: true,
    }, role: {
        type: String, enum: ['admin', 'user'], default: 'user',
    }, token: {
        type: String, unique: true,
    },
}, {timestamps: true});

UserSchema.methods.setPassword = function (password) {
    this.password = bcrypt.hashSync(password, 10);
}


UserSchema.methods.generateJWT = function () {
    return jwt.sign({
        email: this.email, phoneNumber: this.phoneNumber, role: this.role,
    }, 'secret key');
}

UserSchema.methods.setToken = function () {
    this.token = this.generateJWT();
}

UserSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', UserSchema);
