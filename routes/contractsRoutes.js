const express = require('express');
const router = express.Router();
const contractController = require('../controllers/contractController');
const jwt = require('jsonwebtoken');
const clave = 'appkey'; //clave para el token, debe ir en un archivo aparte

function validateToken(req, res, next) {
    let token = req.headers.authorization;

    //me aseguro que si pasó el token
    if (!token){
        return res.status(401).json({message: 'Acceso no autorizado'});
    }else{
        token = token.split(' ')[1];
    }

    // console.log(token);

    jwt.verify(token, clave, (error, decoded) => {
        if (error) {
            console.log(error.JsonWebTokenError);
            return res.status(403).json({message: 'Token inválido'});
        }

        //si el token valida, guardo el id del usuario en el request para usarlo luego
        req.userId = decoded.userId;
        console.log('userId: ' + req.userId)
        next();
    });
};

//aquí van las rutas...
router.post('/', validateToken, contractController.addContract);
router.get('/', validateToken, contractController.getAllContracts);
router.get('/:contractId', validateToken, contractController.getContractById);
router.put('/:contractId', validateToken, contractController.updateContract);
router.delete('/:contractId', validateToken, contractController.deleteContract);

module.exports = router;