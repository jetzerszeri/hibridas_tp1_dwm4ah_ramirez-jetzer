const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    customerId:{
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    receivedDate:{
        type: Date,
        default: Date.now()
    },
    dueDate:{
        type: Date,
    },
    projectManagerId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    market: {
        type: String,
        enum: ['clt', 'atl'],
        default: 'clt'
    },
    status:{
        type: String,
        enum: ['En proceso', 'Retrasado', 'Terminado'],
        default: 'En proceso'
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

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;