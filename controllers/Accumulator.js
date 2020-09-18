const Accumulator = require('../models/Accumulator');
const { validationResult } = require('express-validator/check');
// Route GET REQUEST Endpoint /api-v1/accumulators
// GET all Accumulators
const getAccumulators = async (req, res) => {
    try {

        const accumulators = await Accumulator.find().sort({ date: -1 });

        res.status(200).json(accumulators);
    }
    catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
// Route GET REQUEST Endpoint /api-v1/accumulators/:productcode
// GET Accumulator
const getAccumulatorByCode =  async (req, res) => {
    const productCode  = req.params.productCode;
    // console.log(productCode);
    try{
        const accumulator = await Accumulator.findOne({ productCode: productCode });

        if(!accumulator) return res.status(404).json({ message: "Accumulator Not found"});

        res.status(200).json(accumulator);
    } catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

// Route POST REQUEST Endpoint /api-v1/accumulators
// ADD new Accumulator
const postAccumulator = async (req, res) => {
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
        capacity, 
        amperage, 
        size, 
        polarity 
    } = req.body;

    try{
        const newAccumulator = new Accumulator({
            name, 
            price, 
            imageUrl, 
            description, 
            producer, 
            productCode, 
            capacity, 
            amperage, 
            size, 
            polarity 
        });

        const accumulator = await newAccumulator.save(); // waiting until accumulator saved in DB
        res.status(200).json(accumulator);

    } catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

// Route PUT REQUEST Endpoint /api-v1/accumulators/:id
// UPDATE Accumulator
const updateAccumulatorById =  async (req, res) => {
    const { name, price,
        imageUrl,
        description, producer,
        productCode, capacity,
        amperage, size,
        polarity } = req.body;

    //Build Accumulator Object
    const accumulatorField = {};
    if(name) accumulatorField.name = name;
    if(price) accumulatorField.price = price;
    if(imageUrl) accumulatorField.imageUrl = imageUrl;
    if(description) accumulatorField.description = description;
    if(producer)  accumulatorField.productCode = productCode;
    if(capacity)  accumulatorField.capacity = capacity;
    if(amperage) accumulatorField.amperage = amperage;
    if(size) accumulatorField.size = size;
    if(polarity) accumulatorField.polarity = polarity;
    try{
        let accumulator = await Accumulator.findById(req.params.id);

        if(!accumulator) return res.status(404).json({ message: "Accumulator Not found"});

        accumulator = await Accumulator.findByIdAndUpdate(req.params.id, { $set: accumulatorField }, { new: true});
        res.status(200).json(accumulator);
    } catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

// Route DELETE REQUEST Endpoint /api-v1/accumulators/:id
// DELETE Accumulator
const deleteAccumulatorById = async (req, res) => {

    try{
        let accumulator = await Accumulator.findById(req.params.id);

        if(!accumulator) return res.status(404).json({ message: "Accumulator Not found"});

        await Accumulator.findByIdAndRemove(req.params.id);

        res.status(200).json({ message: "Accumulator deleted from Data Base." });
    } catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

module.exports = {
    getAccumulators,
    getAccumulatorByCode,
    postAccumulator,
    updateAccumulatorById,
    deleteAccumulatorById
};