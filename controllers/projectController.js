const projectModel = require('../models/projectModel.js');
const customerModel = require('../models/customerModel.js');
const userModel = require('../models/userModel.js');

//aquí van las funciones del controlador...

exports.addProject = async (req, res) => {
    try{
        const { name, customerId, projectManagerId, market } = req.body;

        if (!name || name.trim().length === 0 || name.length < 3) {
            return res.status(400).json({ message: 'Nombre no válido' });
        };

        const customer = await customerModel.findById(customerId);
        if(!customer){
            return res.status(404).json({message: 'No se encontró ningún customer con ese id'});
        }

        const projectManager = await userModel.findById(projectManagerId);
        if(!projectManager){
            return res.status(404).json({message: 'No se encontró ningún projectManager con ese id'});
        }

        const project = new projectModel({
            name,
            customerId,
            projectManagerId,
            market
        });

        await project.save();

        res.status(201).json({ message: 'Project creado con éxito', project });



    }catch(error){
        console.log(error);
        res.status(500).json({message: 'Hubo un error en el servidor'});
    }
};

exports.getAllProjects = async (req, res) => {
    try{
        const projects = await projectModel.find();
        res.status(200).json({projects});

    }catch(error){
        console.log(error);
        res.status(500).json({message: 'Hubo un error en el servidor'});
    }
};

exports.getProjectById = async (req, res) => {
    try{
        const id = req.params.projectId;
        const project = await projectModel.findById(id);

        if(!project){
            return res.status(404).json({message: 'No se encontró ningún project con ese id'});
        }

        res.status(200).json({project});
    }catch(error){
        console.log(error);
        res.status(500).json({message: 'Hubo un error en el servidor'});
    }
};

exports.updateProject = async (req, res) => {
    try{
        const id = req.params.projectId;
        const { name, customerId, projectManagerId, market, dueDate, status } = req.body;

        if (!name || name.trim().length === 0 || name.length < 3) {
            return res.status(400).json({ message: 'Nombre no válido' });
        };

        const customer = await customerModel.findById(customerId);
        if(!customer){
            return res.status(404).json({message: 'No se encontró ningún customer con ese id'});
        }

        const projectManager = await userModel.findById(projectManagerId);
        if(!projectManager){
            return res.status(404).json({message: 'No se encontró ningún projectManager con ese id'});
        }

        if(status && status !== 'En proceso' && status !== 'Retrasado' && status !== 'Terminado'){
            return res.status(400).json({ message: 'Status no válido' });
        }

        const filter = { _id: id };
        const update = {
            name,
            customerId,
            projectManagerId,
            market,
            dueDate,
            status,
            updatedAt: Date.now()
        };

        const result = await projectModel.findByIdAndUpdate(filter, update);

        if (!result) {
            return res.status(404).json({ message: 'No se encontró ningún project con ese id' });
        }

        res.status(200).json({ message: 'Project actualizado con éxito', result });


    }catch(error){
        console.log(error);
        res.status(500).json({message: 'Hubo un error en el servidor'});
    }
}