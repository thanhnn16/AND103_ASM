const Product = require('./productModel');
const ProductType = require('../productTypes/productTypeModel');

const index = (req, res) => {
    return res.send('Products');
}

const createProduct = async (req, res) => {
    const {name, description, price, images, productTypeId} = req.body;
    const productType = await ProductType.findById(productTypeId);
    if (!productType) {
        return res.send({status: 'not_found', message: 'Product type not found'});
    }
    const product = new Product({name, description, price, images, productTypeId});
    product.save().then(r => {
        return res.send({status: 'success', message: 'Product created'});
    }).catch(e => {
        return res.send({status: 'error', message: e.message});
    });
}

const getProducts = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    try {
        const products = await Product.find().populate('productTypeId').skip(skip).limit(limit);
        const total = await Product.countDocuments();

        return res.send({
            total,
            pages: Math.ceil(total / limit),
            current: page,
            products
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({status: 'error', message: err.message});
    }
}

const getProduct = async (req, res) => {
    const {id} = req.params;
    try {
        const product = await Product.findById(id, {__v: 0}, {lean: true});
        if (!product) {
            return res.status(404).send({status: 'not_found', message: 'Product not found'});
        }
        const populatedProduct = await Product.populate(product, {path: 'productTypeId'});
        return res.send(populatedProduct);
    } catch (err) {
        console.error(err);
        return res.status(500).send({status: 'error', message: err.message});
    }
}
const updateProduct = async (req, res) => {
    const {id} = req.params;
    const {name, description, price, images, productTypeId} = req.body;
    const productType = await ProductType.findById(productTypeId);
    if (!productType) {
        return res.send({status: 'not_found', message: 'Product type not found'});
    }
    const product = await Product.findById(id);
    if (!product) {
        return res.send({status: 'not_found', message: 'Product not found'});
    }
    product.name = name;
    product.description = description;
    product.price = price;
    product.images = images;
    product.productTypeId = productTypeId;
    product.save().then(r => {
        return res.send({status: 'success', message: 'Product updated'});
    }).catch(e => {
        return res.send({status: 'error', message: e.message});
    });
}

const deleteProduct = async (req, res) => {
    const {id} = req.params;
    const product = await Product.findById(id);
    if (!product) {
        return res.send({status: 'not_found', message: 'Product not found'});
    }
    product.delete().then(r => {
        return res.send({status: 'success', message: 'Product deleted'});
    }).catch(e => {
        return res.send({status: 'error', message: e.message});
    });
}


module.exports = {
    index,
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
}
