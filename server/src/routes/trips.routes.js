const router = require('express').Router();
const {
	getAllTrips,
	getTripById,
	createTrip,
	updateTrip,
	deleteTrip,
} = require('../controllers/trips.controller');
const { checkJwt } = require('../middlewares/auth');
const setUserId = require('../middlewares/setUserId');
const { validatorHandler } = require('../middlewares/validator.handler');
const {
	createTripSchema,
	getTripSchema,
	updateTripSchema,
} = require('../schemas/trip.schema');

router.get('/', getAllTrips);
router.get('/:id', validatorHandler(getTripSchema, 'params'), getTripById);
router.post(
	'/',
	checkJwt(),
	setUserId,
	validatorHandler(createTripSchema, 'body'),
	createTrip
);
router.patch(
	'/:id',
	validatorHandler(getTripSchema, 'params'),
	validatorHandler(updateTripSchema, 'body'),
	updateTrip
);
router.delete('/:id', validatorHandler(getTripSchema, 'params'), deleteTrip);

module.exports = router;
