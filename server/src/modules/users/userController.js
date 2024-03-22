const User = require('./userModel');
const path = require('path');
const fs = require('fs');

async function getUser(req, res, next) {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.send({status: 'not_found', message: 'User not found'});
        }
        return res.send(user);
    }catch (e) {
        return res.send({status: 'error', message: e.message});
    }
}

async function uploadAvatar(req, res) {
    try {
        const userId = req.body.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({status: 'not_found', message: 'User not found'});
        }
        if (user.avatar) {
            const publicPath = path.join(process.cwd(), 'public');
            const avatarPath = path.join(publicPath, 'uploads', 'avatar');
            if (fs.existsSync(path.join(avatarPath, user.avatar))) {
                fs.unlinkSync(path.join(avatarPath, user.avatar));
            } else {
                console.error('File not found');
            }
        }
        user.avatar = (req.file.filename).split('/').pop();
        await user.save();
        res.send({status: 'success', message: 'Avatar uploaded successfully', avatar: user.avatar});
    }
    catch (err) {
        console.error(err);
        res.status(500).send({status: 'error', message: 'Server error'});
    }
}

async function updateUser(req, res) {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.send({status: 'not_found', message: 'User not found'});
        }
        user.email = req.body.email;
        user.info = req.body.info;
        await user.save();
        res.send({status: 'success', message: 'User updated successfully', user});
    } catch (err) {
        console.error(err);
        res.status(500).send({
            status: 'error',
            message: 'Server error: ' + err.message,
    });
}}


module.exports = {
    getUser,
    uploadAvatar,
    updateUser,
}
