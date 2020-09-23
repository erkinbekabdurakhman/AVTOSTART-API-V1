const express = require('express');
const { Router } = require('express');

const {
    getDisks,
    getDiskByCode,
    addDisk,
    updateDiskById,
    deleteDiskById
} = require('../controllers/Disk');

// Initializing route
const router = Router();

// Route GET REQUEST Endpoint /api-v1/disks
// GET ALL Disk
router.get('/', getDisks);

// Route GET REQUEST Endpoint /api-v1/disks/:productCode
// GET DISK BY PRODUCT CODE
router.get('/disk/:productCode', getDiskByCode);

// Route POST REQUEST Endpoint /api-v1/disks/:id
// POST DISK
router.post('/',  addDisk);

// Route PUT REQUEST Endpoint /api-v1/disks/:id
// UPDATE DISK BY ID
router.put('/:id', updateDiskById);

// Route DELETE REQUEST Endpoint /api-v1/disks/:id
// DELETE DISK BY ID
router.delete('/:id', deleteDiskById);

module.exports = router;