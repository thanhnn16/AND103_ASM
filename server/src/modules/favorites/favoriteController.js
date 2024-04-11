const Favorite = require('./favoriteModel');

const getFavorites = async (req, res) => {
    try {
        const favorites = await Favorite.find();
        res.json(favorites);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getFavorite = async (req, res) => {
    try {
        const favorite = await Favorite.findById(req.params.id);
        res.json(favorite);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getFavoritesByUser = async (req, res) => {
    try {
        const favorites = await Favorite.find({ user: req.params.id });
        res.json(favorites);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createFavorite = async (req, res) => {
    const favorite = new Favorite({
        ...req.body
    });

    try {
        const newFavorite = await favorite.save();
        res.status(201).json(newFavorite);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const updateFavorite = async (req, res) => {
    try {
        const favorite = await Favorite.findById(req.params.id);

        if (req.body.name) {
            favorite.name = req.body.name;
        }

        if (req.body.description) {
            favorite.description = req.body.description;
        }

        if (req.body.price) {
            favorite.price = req.body.price;
        }

        const updatedFavorite = await favorite.save();
        res.json(updatedFavorite);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteFavorite = async (req, res) => {
    try {
        const favorite = await Favorite.findById(req.params.id);
        await favorite.remove();
        res.json({ message: 'Favorite removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getFavorites,
    getFavorite,
    getFavoritesByUser,
    createFavorite,
    updateFavorite,
    deleteFavorite
}
