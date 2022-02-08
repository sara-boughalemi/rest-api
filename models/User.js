const mongoose = require ("mongoose")

const User = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        unique: true,
        required : true,
    },
    email:{
        type: String,
        required: true,
        unique :true,
    }

})
module.exports = mongoose.model("user", User);
