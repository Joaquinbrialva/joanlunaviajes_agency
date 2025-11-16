const router = require('express').Router();
const usersRouter = require('./users.routes');
const offersRouter = require('./offers.routes');
const bookingsRouter = require('./bookings.routes');
const reviewsRouter = require('./reviews.routes');
const destinationsRouter = require('./destinations.routes');
const benefitsRouter = require('./benefits.routes');

function routerApi(app) {
	app.use('/api/v1', router);
	router.use('/users', usersRouter);
	router.use('/offers', offersRouter);
	router.use('/bookings', bookingsRouter);
	router.use('/reviews', reviewsRouter);
	router.use('/destinations', destinationsRouter);
	router.use('/benefits', benefitsRouter);
}

module.exports = routerApi;
