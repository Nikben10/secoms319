const mongoose = require('mongoose');

const ReactFormDataSchema = new mongoose.Schema({
        _id: {type: Number},
        name: {type: String},
        price: {type: Number},
        category: {type: String},
        shortDescription: {type: String},
        longDescription: {type: String},
        imageName: {type: String},
        alt: {type: String},
        screenSize: {type: Number},
    },
    { 
    collection: "finalProject319"
});

const Product = mongoose.model('Product', ReactFormDataSchema);

module.exports = Product;