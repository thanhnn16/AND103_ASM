const express = require('express');
const router = express.Router();

const favoriteController = require('./favoriteController');

router.get('/', favoriteController.getFavorites);
router.get('/:id', favoriteController.getFavorite);
router.get('/user/:id', favoriteController.getFavoritesByUser);
router.post('/', favoriteController.createFavorite);
router.put('/:id', favoriteController.updateFavorite);
router.delete('/:id', favoriteController.deleteFavorite);

module.exports = router;
