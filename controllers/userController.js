const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const salt = 10;
const jwt = require('jsonwebtoken');
const clave = 'appkey'; //clave para el token, debe ir en un archivo aparte

exports.addUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

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

        if (!role || role !== 'admin' && role !== 'contractor' && role !== 'pm') {
            return res.status(400).json({ message: 'Rol no válido' });
        }



        const passwordHash = await bcrypt.hash(password, salt);

        const user = new userModel({
            name,
            email,
            password: passwordHash,
            role
        });

        await user.save();

        res.status(201).json({ message: 'Usuario creado con éxito', user });

    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Hubo un error en el servidor'});
    }
};

exports.auth = async (req, res) => {
    const {email, password} = req.body;

    if (!email || !password){
        return res.status(400).json({message: 'Email y contraseña son requeridos'});
    }

    const user = await userModel.findOne({email});
    if (!user){
        return res.status(404).json({message: 'No se encontró ningun usuario con ese email'});
    }

    //verifico si es el email correcto:
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch){
        return res.status(404).json({message: 'Credenciales inválidas'});
    }

    //genero el token:
    const token = jwt.sign({userId: user._id}, clave, {expiresIn: '1h'});

    //envío la respuesta:
    res.status(200).json({message: 'Autenticación exitosa', token});
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Hubo un error en el servidor'});
    }
};

exports.getUserById = async (req, res) => {
    try{
        const id = req.params.userId;
        const user = await userModel.findById(id);

        if (!user){
            return res.status(404).json({message: 'No se encontró ningún usuario con ese id'});
        }

        res.status(200).json(user);
    }catch(error){
        console.log(error);
        res.status(500).json({message: 'Hubo un error en el servidor'});
    }
};

exports.updateUser = async (req, res) => {
    try{
        const id = req.params.userId;
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

        const filter = { _id: id };
        const update = { name, email, password: passwordHash, updatedAt: Date.now() };

        const result = await userModel.findOneAndUpdate(filter, update);

        if (!result){
            return res.status(404).json({message: 'No se encontró ningún usuario con ese id'});
        }

        res.status(200).json({message: 'Usuario actualizado con éxito', user: result});

    }catch(error){
        console.log(error);
        res.status(500).json({message: 'Hubo un error en el servidor'});
    }
};

exports.deleteUser = async (req, res) => {
    try{
        const id = req.params.userId;
        const filter = {_id: id};

        const result = await userModel.deleteOne(filter);

        if (!result){
            return res.status(404).json({message: 'No se encontró ningún usuario con ese id'});
        }

        res.status(200).json({message: 'Usuario eliminado con éxito', result});

    }catch(error){
        console.log(error);
        res.status(500).json({message: 'Hubo un error en el servidor'});
    }
};