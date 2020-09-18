const express = require('express');
const { Router } = require('express');

// Controllers
const { 
    getAccessories,
    getAccessoryByCode,
    postAccessory,
    updateAccessoryById,
    deleteAccessoryById
} = require('../controllers/Accessory');

// Initializing route
const router = Router();

// GET ACCESSORIES
router.get('/', getAccessories);

// GET ACCESSORY BY PRODUCT CODE
router.get('/:productCode', getAccessoryByCode);

// POST ACCESSORY
router.post('/',  postAccessory);

// UPDATE ACCESORY BY ID
router.put('/:id', updateAccessoryById);

// DELETE ACCESSORY BY ID
router.delete('/:id', deleteAccessoryById);

module.exports = router;