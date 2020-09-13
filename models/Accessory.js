const mongoose = require('mongoose');

const AccessorySchema = mongoose.Schema({
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
    feature: {
        type: String,
        required: true
    },
    featureValue: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('accessory', AccessorySchema);