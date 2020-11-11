
const mongoose = require('mongoose');


async function connect(){
        try {
            await mongoose.connect('mongodb://127.0.0.1/Web_API', {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                });

                console.log("Connecting Successfully to DB Web_API");

        } catch (error) {

                console.log('Connecting to db False!');
        }
}

module.exports = { connect };