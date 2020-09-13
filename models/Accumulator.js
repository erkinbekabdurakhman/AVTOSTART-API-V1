const mongoose = require('mongoose');

const AccumulatorSchema = mongoose.Schema({
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
    capacity: {
        type: String,
        required: true
    },
    amperage: {
        type: String,
        requred: true,
    },
    size: {
        type: String,
        requred: true,
    },
    polarity: {
        type: String,
        requred: true,
    }
});

module.exports = mongoose.model('accumulator', AccumulatorSchema);