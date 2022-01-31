const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    product: {
        type: String,
        required: true
    },

    author: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Product', productSchema);