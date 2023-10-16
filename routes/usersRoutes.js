const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({
        message: 'probandoo la ruta desde usuario'
    });
});

module.exports = router;