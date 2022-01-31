const Product = require('../models/product');

module.exports = {
    products: async function () {
        const products = await Product.find();
        return {
            products: products.map((p) => {
                return {
                    ...p._doc,
                    _id: p._id.toString(),
                };
            }),
        };
    },
    createProduct: async function ({productInput}) {
        const product = new Product({
            product: productInput.product,
            author: productInput.author
        });
        const createProduct = await product.save();
        return {
            ...createProduct._doc,
            _id: createProduct._id.toString(),
        }

    },
    updateProduct: async function ({ id, productInput}) {
        const product = await Product.findById(id);
        if(!product) {
            throw new Error('No product found!')
        }
        product.product = productInput.product;
        product.author = productInput.author;
        const updateProduct = await product.save();
        return {
            ...updateProduct._doc,
            _id: updateProduct._id.toString(),
        };
    },
    deleteProduct: async function ({ id}){
        const product = await Product.findById(id);
        if(!product) {
            throw new Error('no product found');
        }
        await Product.findByIdAndRemove(id);
        return {
            ...product._doc,
            _id: product._id.toString(),
        };
    },
};