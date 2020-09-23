const Disk = require('../models/Disk');
const { validationResult } = require('express-validator/check');

// Route GET REQUEST Endpoint /api-v1/disks
// GET all Disks
const getDisks = async (req, res) => {
    try {

        const disks = await Disk.find().sort({ date: -1 });

        res.status(200).json(disks);
    }
    catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

// Route GET REQUEST Endpoint /api-v1/disks/:productCode
// GET Disk by Product Code
const getDiskByCode =  async (req, res) => {
    try{
        let disk = await Disk.findOne({ productCode: req.params.productCode });

        if(!disk) return res.status(404).json({ message: "Disk Not found"});

        res.status(200).json(disk);
    } catch(err){
        console.error();
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

// Route POST REQUEST Endpoint /api-v1/disks
// ADD new Disk
const addDisk = async (req, res) => {
    const errors = validationResult(req);
        
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const { 
        name, 
        price, 
        imageUrl, 
        description, 
        productCode,
        width,
        offset,
        boltPattern
    } = req.body;

    try{
        const newDisk = new Disk({
            name, 
            price, 
            imageUrl, 
            description,
            productCode, 
            width,
            offset,
            boltPattern
        });

        const disk = await newDisk.save(); // waiting until tire saved in DB
        res.status(200).json(disk);

    } catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
// Route PUT REQUEST Endpoint /api-v1/disks/:id
// UPDATE Disk By Id
const updateDiskById =  async (req, res) => {
    const { 
        name, price,
        imageUrl,
        description,
        productCode,
        width, offset,
        boltPattern } = req.body;

    //Build Disk Object
    const diskField = {};
    if(name) diskField.name = name;
    if(price) diskField.price = price;
    if(imageUrl) diskField.imageUrl = imageUrl;
    if(description) diskField.description = description;
    if(productCode) diskField.productCode = productCode;
    if(width) diskField.width = width;
    if(offset) diskField.offset = offset;
    if(boltPattern) diskField.boltPattern = boltPattern;

    try{
        let disk = await Disk.findById(req.params.id);

        if(!disk) return res.status(404).json({ message: "Disk Not found"});

        disk = await Disk.findByIdAndUpdate(req.params.id, { $set: diskField }, { new: true});
        res.status(200).json(disk);
    } catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

// Route DELETE REQUEST Endpoint /api-v1/disks/:id
// DELETE Disk
const deleteDiskById = async (req, res) => {

    try{
        let disk = await Disk.findById(req.params.id);

        if(!disk) return res.status(404).json({ message: "Disk Not found"});

        await Disk.findByIdAndRemove(req.params.id);

        res.status(200).json({ message: "Disk successfully deleted from Data Base" });
    } catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

module.exports = {
    getDisks,
    getDiskByCode,
    addDisk,
    updateDiskById,
    deleteDiskById
}