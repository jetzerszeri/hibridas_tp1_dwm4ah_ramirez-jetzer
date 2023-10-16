const usersRoutes = require('./usersRoutes.js');
const vendorsRoutes = require('./vendorsRoutes.js');

const routerApi = function (app) {
    app.use('/api/users', usersRoutes);
    app.use('/api/vendors', vendorsRoutes);
}

module.exports = routerApi;