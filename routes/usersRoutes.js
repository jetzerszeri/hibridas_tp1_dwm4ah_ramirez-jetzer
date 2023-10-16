const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', (req, res) => {
    res.status(200).json({
        message: 'probandoo la ruta desde usuario'
    });
});

router.post('/', userController.addUser);
router.post('/auth', userController.auth);

module.exports = router;

