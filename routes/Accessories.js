const express = require('express');
const { Router } = require('express');

// Controllers
const { 
    getAccessories,
    getAccessoryById,
    postAccessory,
    updateAccessoryById,
    deleteAccessoryById
} = require('../controllers/Accessory');

// Initializing route
const router = Router();

// GET ACCESSORIES
router.get('/', getAccessories);

// GET ACESSORY BY ID
router.get('/:id', getAccessoryById);

// POST ACCESSORY
router.post('/',  postAccessory);

// UPDATE ACCESORY BY ID
router.put('/:id', updateAccessoryById);

// DELETE ACCESSORY BY ID
router.delete('/:id', deleteAccessoryById);

module.exports = router;