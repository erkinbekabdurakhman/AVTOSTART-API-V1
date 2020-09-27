const mongoose = require('mongoose');

const connectDataBase = async () => {
    try {
        await mongoose.connect("mongodb://46.101.169.246:27017/autodor", {
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