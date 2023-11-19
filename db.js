const mongoose = require("mongoose");

function connectDB() {

    mongoose.set('strictQuery', true);

    mongoose.connect(`mongodb+srv://user:hztHmDTfkSGd1p4D@cluster0.mc3htnf.mongodb.net/digital-note`, { useUnifiedTopology: true, useNewUrlParser: true })

    const connection = mongoose.connection

    connection.on('connected', () => {
        console.log('Mongo DB Connection Successfull')
    })

    connection.on('error', () => {
        console.log('Mongo DB Connection Error')
    })


}

connectDB()

module.exports = mongoose