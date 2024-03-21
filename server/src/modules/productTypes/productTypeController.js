const ProductType = require("./productTypeModel");
const Product = require("../products/productModel");

const index = (req, res) => {
    res.send("Product Types");
}
const getProductTypes = async (req, res) => {
    try {
        const productTypes = await ProductType.find();
        return res.send(productTypes);
    } catch (err) {
        return res.status(500).send({status: 'error', message: err.message});
    }
}

const getProductByType = async (req, res) => {
    const {id} = req.params;
    try {
        const productType = await ProductType.findById(id);
        if (!productType) {
            return res.status(404).send({status: 'not_found', message: 'Product type not found'});
        }
        const products = await Product.find({productTypeId: id});
        return res.send(products);
    } catch (err) {
        return res.status(500).send({status: 'error', message: err.message});
    }
}

module.exports = {
    index,
    getProductTypes,
    getProductByType
}
