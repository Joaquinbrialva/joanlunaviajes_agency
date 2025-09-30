const router = require('express').Router();
const usersRouter = require('./users.routes');
const tripsRouter = require('./trips.routes');

function routerApi(app) {
	app.use('/api/v1', router);
	router.use('/users', usersRouter);
	router.use('/trips', tripsRouter);
}

module.exports = routerApi;
