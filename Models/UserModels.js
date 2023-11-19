const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required:  true,
        minLength: 8,
    }
})

const userModel = mongoose.model('users', userSchema)

module.exports = userModel