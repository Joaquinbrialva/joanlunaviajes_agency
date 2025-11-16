const router = require('express').Router();
const {
	getAllReviews,
	getReviewById,
	createReview,
	updateReview,
	deleteReview,
} = require('../controllers/reviews.controller');
const { checkJwt } = require('../middlewares/auth');
const { validatorHandler } = require('../middlewares/validator.handler');
const {
	createReviewSchema,
	updateReviewSchema,
	getReviewSchema,
} = require('../schemas/review.schema');

router.get('/', getAllReviews);
router.get('/:id', validatorHandler(getReviewSchema, 'params'), getReviewById);
router.post(
	'/',
	checkJwt(),
	validatorHandler(createReviewSchema, 'body'),
	createReview
);
router.patch(
	'/:id',
	checkJwt(),
	validatorHandler(updateReviewSchema, 'body'),
	updateReview
);
router.delete(
	'/:id',
	checkJwt(),
	validatorHandler(getReviewSchema, 'params'),
	deleteReview
);

module.exports = router;
