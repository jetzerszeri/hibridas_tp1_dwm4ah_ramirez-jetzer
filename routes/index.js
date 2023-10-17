const usersRoutes = require('./usersRoutes.js');
const vendorsRoutes = require('./vendorsRoutes.js');
const customersRoutes = require('./customersRoutes.js');

const routerApi = function (app) {
    app.use('/api/users', usersRoutes);
    app.use('/api/vendors', vendorsRoutes);
    app.use('/api/customers', customersRoutes);
}

module.exports = routerApi;