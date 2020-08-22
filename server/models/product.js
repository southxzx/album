const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
    name: {
        required: true,
        type: String,
        unique: 1,
        maxlength: 100
    },
    description: {
        required: true,
        type: String,
        maxlength: 100 
    },
    price: {
        required: true,
        type: Number,
        maxlength: 255
    },
    genre: {
        type: Schema.Types.ObjectId,
        ref: 'Genre',
        required: true
    },
    shipping: {
        required: true,
        type: Boolean
    },
    available: {
        required: true,
        type: Boolean
    },
    material: {
        type: Schema.Types.ObjectId,
        ref: 'Material',
        required: true  
    },
    songs: {
        required: true,
        type: Number
    },
    singer: {
        required: true,
        type: String,
        maxlength: 100
    },
    sold: {
        type: Number,
        maxlength: 100,
        default: 0
    },
    publish: {
        required: true,
        type: Boolean
    },
    image: {
        type: Array,
        default: []
    }
},{timestamps: true})

const Product = mongoose.model('Product', productSchema);

module.exports = { Product }