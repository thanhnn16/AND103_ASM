const express = require('express');
const router = express.Router();
const registerController = require('./registerController');
const loginController = require('./loginController');
const User = require('../userModel');

router.get('/login', function(req, res, next) {
    res.render('login');
});

router.get('/register', function (req, res, next) {
    res.send('Register');
});

// router.get('/user/:id', async function (req, res, next) {
//     const { id } = req.params;
//     const user = await User.findById(id);
//     if (!user) {
//         return res.send('User not found');
//     }
//     return res.send(user);
// });

router.post('/register', registerController);
router.post('/login', loginController);


module.exports = router;
