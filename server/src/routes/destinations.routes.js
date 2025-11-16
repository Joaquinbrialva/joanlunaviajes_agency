const router = require('express').Router();
const {
	getAllDestinations,
	getDestinationById,
	createDestination,
	updateDestination,
	deleteDestination,
} = require('../controllers/destinations.controller');
const { checkJwt } = require('../middlewares/auth');
const { validatorHandler } = require('../middlewares/validator.handler');
const {
	createDestinationSchema,
	updateDestinationSchema,
	getDestinationSchema,
} = require('../schemas/destination.schema');

router.get('/', getAllDestinations);
router.get(
	'/:id',
	validatorHandler(getDestinationSchema, 'params'),
	getDestinationById
);
router.post(
	'/',
	checkJwt(),
	validatorHandler(createDestinationSchema, 'body'),
	createDestination
);
router.patch(
	'/:id',
	checkJwt(),
	validatorHandler(updateDestinationSchema, 'body'),
	updateDestination
);
router.delete(
	'/:id',
	checkJwt(),
	validatorHandler(getDestinationSchema, 'params'),
	deleteDestination
);

module.exports = router;
