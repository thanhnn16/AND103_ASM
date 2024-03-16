const express = require('express');
const router = express.Router();
const registerController = require('../controllers/auth/registerController');
const loginController = require('../controllers/auth/loginController');

router.get('/login', function(req, res, next) {
    res.render('login');
});

router.get('/register', function (req, res, next) {
    res.send('Register');
});

router.post('/register', registerController);
router.post('/login', loginController);


module.exports = router;