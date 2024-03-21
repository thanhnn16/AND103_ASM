const User = require('./userModel');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage });

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
            return res.status(404).send({ message: 'User not found' });
        }
        if (user.avatar) {
            fs.unlink(path.join(__dirname, user.avatar), err => {
                if (err) {
                    console.error(err);
                    return res.status(500).send({ message: 'Error deleting old avatar' });
                }
            });
        }
        user.avatar = req.file.path;
        await user.save();
        res.send({ message: 'Avatar uploaded successfully', avatarPath: req.file.path });
    }
    catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Server error' });
    }
}

module.exports = {
    getUser,
    uploadAvatar}
