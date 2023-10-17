const customerModel = require('../models/customerModel.js');

//aquí van las funciones del controlador...

exports.addCustomer = async (req, res) => {
    try{
        const { name, address } = req.body;

        if (!name || name.trim().length === 0 || name.length < 3) {
            return res.status(400).json({ message: 'Nombre no válido' });
        };

        if (!address || address.trim().length === 0 || address.length < 3) {
            return res.status(400).json({ message: 'Dirección no válida' });
        };

        const customer = new customerModel({
            name,
            address
        });

        await customer.save();

        res.status(201).json({ message: 'Customer creado con éxito', customer });

    }catch(error){
        console.log(error);
        res.status(500).json({message: 'Hubo un error en el servidor'});
    }
};

exports.getAllCustomers = async (req, res) => {
    try{
        const customers = await customerModel.find();
        res.status(200).json({customers});

    }catch(error){
        console.log(error);
        res.status(500).json({message: 'Hubo un error en el servidor'});
    }
};

exports.getCustomerById = async (req, res) => {
    try{
        const id = req.params.customerId;
        const customer = await customerModel.findById(id);

        if(!customer){
            return res.status(404).json({message: 'No se encontró ningún customer con ese id'});
        }

        res.status(200).json({customer});
    }catch(error){
        console.log(error);
        res.status(500).json({message: 'Hubo un error en el servidor'});
    }
};

exports.updateCustomer = async (req, res) => {
    try{
        const id = req.params.customerId;
        const { name, address } = req.body;

        if (!name || name.trim().length === 0 || name.length < 3) {
            return res.status(400).json({ message: 'Nombre no válido' });
        };

        if (!address || address.trim().length === 0 || address.length < 3) {
            return res.status(400).json({ message: 'Dirección no válida' });
        };

        const filter = { _id: id };
        const update = { name, address, updatedAt: Date.now() };

        const result = await customerModel.findByIdAndUpdate(filter, update);

        if (!result) {
            return res.status(404).json({ message: 'No se encontró ningún customer con ese id' });
        }

        res.status(200).json({ message: 'Customer actualizado con éxito', result });


    }catch(error){
        console.log(error);
        res.status(500).json({message: 'Hubo un error en el servidor'});
    }
};