const vendorModel = require('../models/vendorModel.js');
const bcrypt = require('bcrypt');
const salt = 10;
const jwt = require('jsonwebtoken');
const clave = 'appkey'; //clave para el token, debe ir en un archivo aparte


//aquí van las funciones del controlador...

exports.addVendor = async (req, res) => {
    try{
        const { name, email, phone, hiredDate } = req.body;

        if (!name || name.trim().length === 0 || name.length < 3) {
            return res.status(400).json({ message: 'Nombre no válido' });
        };

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !email.match(emailRegex)) {
            return res.status(400).json({ message: 'Correo electrónico no válido' });
        };

        if (!phone || isNaN(phone) || phone.length < 6) {
            return res.status(400).json({ message: 'Teléfono no válido' });
        }

        const vendor = new vendorModel({
            name,
            email,
            phone,
            hiredDate
        });

        await vendor.save();

        res.status(201).json({ message: 'Vendor creado con éxito', vendor });

    }catch(error){
        console.log(error);
        res.status(500).json({message: 'Hubo un error en el servidor'});
    }
};

exports.getAllVendors = async (req, res) => {
    try{
        const vendors = await vendorModel.find();
        res.status(200).json({vendors});
    }catch(error){
        console.log(error);
        res.status(500).json({message: 'Hubo un error en el servidor'});
    }
};

exports.getVendorById = async (req, res) => {
    try{
        const id = req.params.vendorId;
        const vendor = await vendorModel.findById(id);

        if(!vendor){
            return res.status(404).json({message: 'No se encontró ningún vendor con ese id'});
        }

        res.status(200).json({vendor});
    }catch(error){
        console.log(error);
        res.status(500).json({message: 'Hubo un error en el servidor'});
    }
};

exports.updateVendor = async (req, res) => {
    try{
        const id = req.params.vendorId;
        const { name, email, phone, hiredDate } = req.body;

        if (!name || name.trim().length === 0 || name.length < 3) {
            return res.status(400).json({ message: 'Nombre no válido' });
        };

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !email.match(emailRegex)) {
            return res.status(400).json({ message: 'Correo electrónico no válido' });
        };

        if (!phone || isNaN(phone) || phone.length < 6) {
            return res.status(400).json({ message: 'Teléfono no válido' });
        }

        const filter = { _id: id };
        const update = { name, email, phone, hiredDate, updatedAt: Date.now() };

        const result = await vendorModel.findByIdAndUpdate(filter, update);

        if (!result){
            return res.status(404).json({message: 'No se encontró ningún vendor con ese id'});
        }

        res.status(200).json({message: 'Vendor actualizado con éxito', vendor: result});

    }catch(error){
        console.log(error);
        res.status(500).json({message: 'Hubo un error en el servidor'});
    }
};

exports.deleteVendor = async (req, res) => {
    try{
        const id = req.params.vendorId;
        const result = await vendorModel.findByIdAndDelete(id);

        if (!result){
            return res.status(404).json({message: 'No se encontró ningún vendor con ese id'});
        }

        res.status(200).json({message: 'Vendor eliminado con éxito', vendor: result});
    }catch(error){
        console.log(error);
        res.status(500).json({message: 'Hubo un error en el servidor'});
    }
};