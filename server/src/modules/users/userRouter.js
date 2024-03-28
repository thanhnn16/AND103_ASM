const express = require('express');
const router = express.Router();
const userController = require('./userController');
const {  uploadAvatar } = require('../../utils/multer');

router.get('/all', userController.getUsers);

router.get('/:id', userController.getUser);

router.post('/upload-avatar', uploadAvatar.single('avatar'), userController.uploadAvatar);

// router.put('/update/:id', upload.none(), uploadAvatar.single('avatar'), userController.updateAndUploadAvt);

router.put('/:id', userController.updateUser);

module.exports = router;
