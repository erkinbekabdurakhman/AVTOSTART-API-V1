const mongoose = require('mongoose');

const config = require('config');

const database = config.get('mongoURI');

const connectDataBase = async () => {
    try {
        await mongoose.connect(database, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })

        console.log('MongoDB connected . . .')
    } catch(err) {
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = connectDataBase;