const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerShema = new Schema({
    name:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt:{
        type: Date,
        default: Date.now()
    }
});

const Customer = mongoose.model('Customer', customerShema);
module.exports = Customer;