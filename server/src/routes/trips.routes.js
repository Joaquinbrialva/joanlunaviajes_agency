const router = require('express').Router();
const {
	getAllTrips,
	getTripById,
	createTrip,
	updateTrip,
	deleteTrip,
} = require('../controllers/trips.controller');

const { checkJwt } = require('../middlewares/auth');
const { upload } = require('../middlewares/multer');
const setUserId = require('../middlewares/setUserId');
const { validatorHandler } = require('../middlewares/validator.handler');
const {
	createTripSchema,
	getTripSchema,
	updateTripSchema,
} = require('../schemas/trip.schema');

router.get('/', getAllTrips);
router.get('/:tripId', validatorHandler(getTripSchema, 'params'), getTripById);

router.post(
	'/',
	checkJwt(),
	upload.single('image'),
	setUserId,
	validatorHandler(createTripSchema, 'body'), // ✅ luego validación del body
	createTrip // ✅ finalmente, lógica del negocio
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
