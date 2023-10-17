const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contractShema = new Schema({
    name:{
        type: String,
        required: true
    },
    projectId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    vendorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor',
        required: true
    },
    contractNumber:{
        type: String,
        required: true
    },
    status:{
        type: String,
        enum: ['En proceso', 'Retrasado', 'Terminado'],
        default: 'En proceso'
    },
    amount:{
        type: Number,
        required: true
    },
    paymentStatus:{
        type: String,
        enum: ['Pendiente', '40%', '60%', '100%'],
        default: 'Pendiente'
    },
    assigedAt:{
        type: Date,
    },
    closedAt:{
        type: Date
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

const Contract = mongoose.model('Contract', contractShema);
module.exports = Contract;