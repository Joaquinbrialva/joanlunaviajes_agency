const router = require('express').Router();
const {
	getAllBookings,
	getBookingById,
	createBooking,
	updateBooking,
	deleteBooking,
} = require('../controllers/bookings.controller');
const { checkJwt } = require('../middlewares/auth');
const { validatorHandler } = require('../middlewares/validator.handler');
const {
	createBookingSchema,
	updateBookingSchema,
	getBookingSchema,
} = require('../schemas/booking.schema');

router.get('/', checkJwt(), getAllBookings);
router.get(
	'/:id',
	checkJwt(),
	validatorHandler(getBookingSchema, 'params'),
	getBookingById
);
router.post(
	'/',
	checkJwt(),
	validatorHandler(createBookingSchema, 'body'),
	createBooking
);
router.patch(
	'/:id',
	checkJwt(),
	validatorHandler(updateBookingSchema, 'body'),
	updateBooking
);
router.delete(
	'/:id',
	checkJwt(),
	validatorHandler(getBookingSchema, 'params'),
	deleteBooking
);

module.exports = router;
