const multer = require("multer");

const avatarStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/avatar/')
    },
    filename: function (req, file, cb) {
        const ext = file.originalname.split('.').pop();
        cb(null, Date.now() + req.body.userId + '.' + ext);
    }
})

const uploadAvatar = multer({storage: avatarStorage});

module.exports = uploadAvatar;
