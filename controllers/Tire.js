const Tire = require('../models/Tire');
const { validationResult } = require('express-validator/check');

// Route GET REQUEST Endpoint /api-v1/tires
// GET all Tires
const getTires = async (req, res) => {
    try {

        const tires = await Tire.find().sort({ date: -1 });

        res.status(200).json(tires);
    }
    catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
// Route GET REQUEST Endpoint /api-v1/tires/:productCode
// GET Tire by Product Code
const getTireByCode =  async (req, res) => {
    const productCode = req.params.productCode;
    
    try{
        const tire = await Tire.findOne({ productCode: productCode });

        if(!tire) return res.status(404).json({ message: "Tire Not found"});

        res.status(200).json(tire);
    } catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
// Route POST REQUEST Endpoint /api-v1/tires
// ADD new Tire
const addTire = async (req, res) => {
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
        width,
        height,
        diameter,
        season 
    } = req.body;

    try{
        const newTire = new Tire({
            name, 
            price, 
            imageUrl, 
            description, 
            producer,
            productCode, 
            width,
            height,
            diameter,
            season 
        });

        const tire = await newTire.save(); // waiting until tire saved in DB
        res.status(200).json(tire);

    } catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
// Route PUT REQUEST Endpoint /api-v1/tires/:id
// UPDATE Tire
const updateTireById =  async (req, res) => {
    const { 
        name, price,
        imageUrl,
        description, producer,
        productCode,
        width, height,
        diameter, season } = req.body;

    //Build Accumulator Object
    const tireField = {};
    if(name) tireField.name = name;
    if(price) tireField.price = price;
    if(imageUrl) tireField.imageUrl = imageUrl;
    if(description) tireField.description = description;
    if(producer)  tireField.producer = producer;
    if(productCode) tireField.productCode = productCode;
    if(width) tireField.width = width;
    if(height) tireField.height = height;
    if(diameter) tireField.diameter = diameter;
    if(season) tireField.season = season;

    try{
        let tire = await Tire.findById(req.params.id);

        if(!tire) return res.status(404).json({ message: "Tire Not found"});

        tire = await Tire.findByIdAndUpdate(req.params.id, { $set: tireField }, { new: true});
        res.status(200).json(tire);
    } catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
// Route DELETE REQUEST Endpoint /api-v1/tires/:id
// DELETE Tire
const deleteTireById = async (req, res) => {

    try{
        let tire = await Tire.findById(req.params.id);

        if(!tire) return res.status(404).json({ message: "Tire Not found"});

        await Tire.findByIdAndRemove(req.params.id);

        res.status(200).json({ message: "Tire successfully deleted from Data Base" });
    } catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
module.exports = {
    getTires,
    getTireByCode,
    addTire,
    updateTireById,
    deleteTireById
}