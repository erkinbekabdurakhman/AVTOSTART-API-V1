const mongoose = require('mongoose');

const TireSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        required: true
    },
    producer: {
        type: String,
        required: true
    },
    productCode: {
        type: String,
        required: true
    },
    width: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    diameter: {
        type: Number,
        required: true
    },
    season: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('tire', TireSchema);