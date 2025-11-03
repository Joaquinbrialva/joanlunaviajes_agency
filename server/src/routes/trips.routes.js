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

const { upload, normalizeTripBody } = require('../middlewares/multer');

router.get('/', getAllTrips);
router.get('/:tripId', validatorHandler(getTripSchema, 'params'), getTripById);

router.post(
	'/',
	checkJwt(),
	upload.array('photos'),       // aceptar múltiples fotos
	setUserId,
	normalizeTripBody,            // usa el middleware modularizado
	validatorHandler(createTripSchema, 'body'),
	createTrip
);

router.patch(
	'/update/:id',
	checkJwt(),
	validatorHandler(getTripSchema, 'params'),
	validatorHandler(updateTripSchema, 'body'),
	updateTrip
);

router.delete(
	'/:id',
	checkJwt(),
	validatorHandler(getTripSchema, 'params'),
	deleteTrip
);

module.exports = router;
