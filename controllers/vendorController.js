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