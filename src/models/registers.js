const mongoose = require('mongoose');

const employSchema= new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    }
})

// Collections making
const Register=new mongoose.model("Registers",employSchema);
module.exports = Register;
