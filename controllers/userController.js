const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const salt = 10;
const jwt = require('jsonwebtoken');
const clave = 'appkey'; //clave para el token, debe ir en un archivo aparte

exports.addUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || name.trim().length === 0 || name.length < 3) {
            return res.status(400).json({ message: 'Nombre no válido' });
        };

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !email.match(emailRegex)) {
            return res.status(400).json({ message: 'Correo electrónico no válido' });
        };

        if (!password || password.length < 6) {
            return res.status(400).json({ message: 'Contraseña no válida' });
        }



        const passwordHash = await bcrypt.hash(password, salt);

        const user = new userModel({
            name,
            email,
            password: passwordHash
        });

        await user.save();

        res.status(201).json({ message: 'Usuario creado con éxito', user });

    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Hubo un error en el servidor'});
    }
}
