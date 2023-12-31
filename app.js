const express = require('express');
const dataBase = require('./dataBase');
const routerApi = require('./routes');


const app = express();
const port = 3000;

app.use(express.json());

//me conecto a la DB
dataBase.once('error', () => console.log('Error al conectar a la DB'));
dataBase.once('open', () => console.log('Conectado a la DB'));

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'BrighterC API Rest'
    });
});

routerApi(app);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

