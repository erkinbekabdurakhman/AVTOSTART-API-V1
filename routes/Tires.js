const express = require('express');
const { Router } = require('express');

// Controllers
const { 
    getTires,
    getTiresBySeason,
    getTireByCode,
    addTire,
    updateTireById,
    deleteTireById
} = require('../controllers/Tire');

// Initializing route
const router = Router();

// Route GET REQUEST Endpoint /api-v1/tires
// GET ALL Tire
router.get('/', getTires);

// Route GET REQUEST Endpoint /api-v1/tires/:season
// GET TIRES BY SEASON
router.get('/:season', getTiresBySeason);

// Route GET REQUEST Endpoint /api-v1/tires/:productCode
// GET TIRE BY PRODUCT CODE
router.get('/tire/:productCode', getTireByCode);

// Route POST REQUEST Endpoint /api-v1/tires/:id
// POST TIRE
router.post('/',  addTire);

// Route PUT REQUEST Endpoint /api-v1/tires/:id
// UPDATE TIRE BY ID
router.put('/:id', updateTireById);

// Route DELETE REQUEST Endpoint /api-v1/tires/:id
// DELETE TIRE BY ID
router.delete('/:id', deleteTireById);

module.exports = router;