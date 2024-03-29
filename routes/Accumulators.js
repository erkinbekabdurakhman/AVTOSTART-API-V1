const express = require('express');
const { Router } = require('express');

// Controllers
const {
    getAccumulators,
    getAccumulatorsByBrand,
    getAccumulatorByCode,
    postAccumulator,
    updateAccumulatorById,
    deleteAccumulatorById
} = require('../controllers/Accumulator');

// Initializing route
const router = Router();

// GET ACCUMULATORS
router.get('/', getAccumulators);

// GET ACCUMULATORS BY BRAND
router.get('/:brand', getAccumulatorsByBrand);

// GET ACCUMULATOR BY ID
router.get('/accumulator/:productCode', getAccumulatorByCode);

// POST ACCUMULATOR
router.post('/',  postAccumulator);

// UPDATE ACCESSORY BY ID
router.put('/:id', updateAccumulatorById);

// DELETE ACCESSORY BY ID
router.delete('/:id', deleteAccumulatorById);

module.exports = router;