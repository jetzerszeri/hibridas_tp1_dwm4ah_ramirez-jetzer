const contractModel = require('../models/contractModel.js');
const projectModel = require('../models/projectModel.js');
const vendorModel = require('../models/vendorModel.js');

//aquí van las funciones del controlador...

exports.addContract = async (req, res) => {
    try{
        const { name, projectId, vendorId, contractNumber, amount, paymentStatus, assigedAt } = req.body;

        if (!name || name.trim().length === 0 || name.length < 3) {
            return res.status(400).json({ message: 'Nombre no válido' });
        };

        const project = await projectModel.findById(projectId);
        if(!project){
            return res.status(404).json({message: 'No se encontró ningún project con ese id'});
        }

        const vendor = await vendorModel.findById(vendorId);
        if(!vendor){
            return res.status(404).json({message: 'No se encontró ningún vendor con ese id'});
        }

        if (!contractNumber) {
            return res.status(400).json({ message: 'el contractNumber es obligatorio' });
        }

        if (!amount) {
            return res.status(400).json({ message: 'el amount es obligatorio' });
        }

        const contract = new contractModel({
            name, 
            projectId,
            vendorId,
            contractNumber,
            amount,
            paymentStatus,
            assigedAt
        })

        await contract.save();

        res.status(201).json({ message: 'Contract creado con éxito', contract });

    }catch(error){
        console.log(error);
        res.status(500).json({message: 'Hubo un error en el servidor'});
    }
};

exports.getAllContracts = async (req, res) => {
    try{
        const contracts = await contractModel.find();
        res.status(200).json({contracts});

    }catch(error){
        console.log(error);
        res.status(500).json({message: 'Hubo un error en el servidor'});
    }
};

exports.getContractById = async (req, res) => {
    try{
        const id = req.params.contractId;
        const contract = await contractModel.findById(id);

        if(!contract){
            return res.status(404).json({message: 'No se encontró ningún contract con ese id'});
        }

        res.status(200).json({contract});
    }catch(error){
        console.log(error);
        res.status(500).json({message: 'Hubo un error en el servidor'});
    }
}

exports.updateContract = async (req, res) => {
    try{
        const id = req.params.contractId;
        const { name, projectId, vendorId, contractNumber, amount, paymentStatus, assigedAt, status } = req.body;

        if (!name || name.trim().length === 0 || name.length < 3) {
            return res.status(400).json({ message: 'Nombre no válido' });
        };

        const project = await projectModel.findById(projectId);
        if(!project){
            return res.status(404).json({message: 'No se encontró ningún project con ese id'});
        }

        const vendor = await vendorModel.findById(vendorId);
        if(!vendor){
            return res.status(404).json({message: 'No se encontró ningún vendor con ese id'});
        }

        if (!contractNumber) {
            return res.status(400).json({ message: 'el contractNumber es obligatorio' });
        }

        if (!amount) {
            return res.status(400).json({ message: 'el amount es obligatorio' });
        }

        if (paymentStatus && paymentStatus != 'Pendiente' && paymentStatus != '40%' && paymentStatus != '60%' && paymentStatus != '100%') {
            return res.status(400).json({ message: 'paymentStatus no válido' });
        }

        if(status && status !== 'En proceso' && status !== 'Retrasado' && status !== 'Terminado'){
            return res.status(400).json({ message: 'Status no válido' });
        }

        const filter = { _id: id };
        const update = { name, projectId, vendorId, contractNumber, amount, paymentStatus, assigedAt, status, updatedAt: Date.now() };

        const result = await contractModel.findByIdAndUpdate(filter, update);

        if (!result) {
            return res.status(404).json({ message: 'No se encontró ningún contract con ese id' });
        }

        res.status(200).json({ message: 'Contract actualizado con éxito', result });

    }catch(error){
        console.log(error);
        res.status(500).json({message: 'Hubo un error en el servidor'});
    }
};

exports.deleteContract = async (req, res) => {
    try{
        const id = req.params.contractId;
        const result = await contractModel.findByIdAndDelete(id);

        if(!result){
            return res.status(404).json({message: 'No se encontró ningún contract con ese id'});
        }

        res.status(200).json({message: 'Contract eliminado con éxito', result});

    }catch(error){
        console.log(error);
        res.status(500).json({message: 'Hubo un error en el servidor'});
    }
};