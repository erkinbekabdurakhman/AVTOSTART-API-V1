const Accessory = require('../models/Accessory');
const { validationResult } = require('express-validator/check');

// Route GET REQUEST Endpoint /api-v1/accessories
// GET all Accessories
const getAccessories = async (req, res) => {
    try {

        const accessories = await Accessory.find().sort({ date: -1 });

        res.status(200).json(accessories);
    }
    catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
// Route GET REQUEST Endpoint /api-v1/accessories/:productCode
// GET Accessory by Product Code
const getAccessoryByCode =  async (req, res) => {
    const productCode = req.params.productCode;

    try{
        const accessory = await Accessory.findOne({ productCode: productCode });

        if(!accessory) return res.status(404).json({ message: "Accessory Not found"});

        res.status(200).json(accessory);
    } catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

// Route POST REQUEST Endpoint /api-v1/accessories
// ADD new Accessory
const postAccessory = async (req, res) => {
    const errors = validationResult(req);
        
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const { 
        name, 
        price, 
        imageUrl, 
        description, 
        producer, 
        productCode, 
        feature,
        featureValue 
    } = req.body;

    try{
        const newAccessory = new Accessory({
            name, 
            price, 
            imageUrl, 
            description, 
            producer, 
            productCode, 
            feature,
            featureValue
        });

        const accessory = await newAccessory.save(); // waiting until accessory saved in DB
        res.status(200).json(accessory);

    } catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
// Route PUT REQUEST Endpoint /api-v1/accessories/:id
// UPDATE Accumulator
const updateAccessoryById =  async (req, res) => {
    const { 
        name, price,
        imageUrl,
        description, producer,
        productCode, feature,
        featureValue } = req.body;

    //Build Accumulator Object
    const accessoryField = {};
    if(name) accessoryField.name = name;
    if(price) accessoryField.price = price;
    if(imageUrl) accessoryField.imageUrl = imageUrl;
    if(description) accessoryField.description = description;
    if(producer)  accessoryField.productCode = productCode;
    if(feature)  accessoryField.feature = feature;
    if(featureValue) accessoryField.featureValue = featureValue;

    try{
        let accessory = await Accessory.findById(req.params.id);

        if(!accessory) return res.status(404).json({ message: "Accessory Not found"});

        accessory = await Accessory.findByIdAndUpdate(req.params.id, { $set: accessoryField }, { new: true});
        res.status(200).json(accessory);
    } catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
// Route DELETE REQUEST Endpoint /api-v1/accumulators/:id
// DELETE Accumulator
const deleteAccessoryById = async (req, res) => {

    try{
        let accessory = await Accessory.findById(req.params.id);

        if(!accessory) return res.status(404).json({ message: "Accessory Not found"});

        await Accessory.findByIdAndRemove(req.params.id);

        res.status(200).json({ message: "Accessory deleted from Data Base" });
    } catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
module.exports = {
    getAccessories,
    getAccessoryByCode,
    postAccessory,
    updateAccessoryById,
    deleteAccessoryById
}