
const mongoose = require('mongoose')

async function connect(){
        try {
            await mongoose.connect('mongodb://127.0.0.1/WEB_API', {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                })
                console.log("Connected Successfully to DB Web_API");
                
        } catch(error) {
                console.log(`Connect to db False  with Error ${error}`);
        }
}
module.exports = { connect };