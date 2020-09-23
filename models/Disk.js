const mongoose = require('mongoose');

const DiskSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        requred: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        required: true
    },
    width: {
        type: String,
        required: true
    },
    offset: {
        type: String,
        required: true
    },
    boltPattern: {
        type: String,
        required: true
    },
    productCode: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('disk', DiskSchema);