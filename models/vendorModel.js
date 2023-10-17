const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vendorShema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    },
    hiredDate: {
        type: Date,
        default: Date.now()
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

const Vendor = mongoose.model('Vendor', vendorShema);
module.exports = Vendor;