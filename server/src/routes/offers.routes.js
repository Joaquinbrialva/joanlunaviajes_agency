const router = require('express').Router();
const {
	getAllOffers,
	getOfferById,
	createOffer,
	updateOffer,
	deleteOffer,
} = require('../controllers/offers.controller');

const { checkJwt } = require('../middlewares/auth');
const setUserId = require('../middlewares/setUserId');
const { validatorHandler } = require('../middlewares/validator.handler');
const { upload } = require('../middlewares/multer');
const parseFormData = require('../middlewares/parseFormData');
const {
	createOfferSchema,
	updateOfferSchema,
	getOfferSchema,
} = require('../schemas/offer.schema');

router.get('/', getAllOffers);
router.get('/:id', validatorHandler(getOfferSchema, 'params'), getOfferById);

router.post(
	'/',
	checkJwt(),
	upload.array('images', 10), // Máximo 10 imágenes
	parseFormData,
	setUserId,
	validatorHandler(createOfferSchema, 'body'),
	createOffer
);

router.patch(
	'/:id',
	checkJwt(),
	upload.array('images', 10), // Máximo 10 imágenes
	parseFormData,
	validatorHandler(getOfferSchema, 'params'),
	validatorHandler(updateOfferSchema, 'body'),
	updateOffer
);

router.delete(
	'/:id',
	checkJwt(),
	validatorHandler(getOfferSchema, 'params'),
	deleteOffer
);

module.exports = router;
