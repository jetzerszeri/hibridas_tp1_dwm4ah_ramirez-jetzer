const usersRoutes = require('./usersRoutes.js');
const vendorsRoutes = require('./vendorsRoutes.js');
const customersRoutes = require('./customersRoutes.js');
const projectsRoutes = require('./projectsRoutes.js');
const contractsRoutes = require('./contractsRoutes.js');

const routerApi = function (app) {
    app.use('/api/users', usersRoutes);
    app.use('/api/vendors', vendorsRoutes);
    app.use('/api/customers', customersRoutes);
    app.use('/api/projects', projectsRoutes);
    app.use('/api/contracts', contractsRoutes);
}

module.exports = routerApi;