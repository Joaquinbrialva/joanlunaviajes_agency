const router = require('express').Router();
const usersRouter = require('./users.routes');

function routerApi(app) {
	app.use('/api/v1', router);
	router.use('/users', usersRouter);
}

module.exports = routerApi;
