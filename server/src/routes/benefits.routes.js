const router = require('express').Router();
const {
	getAllBenefits,
	getBenefitById,
	createBenefit,
	updateBenefit,
	deleteBenefit,
} = require('../controllers/benefits.controller');
const { checkJwt } = require('../middlewares/auth');
const { validatorHandler } = require('../middlewares/validator.handler');
const {
	createBenefitSchema,
	updateBenefitSchema,
	getBenefitSchema,
} = require('../schemas/benefit.schema');

router.get('/', getAllBenefits);
router.get(
	'/:id',
	validatorHandler(getBenefitSchema, 'params'),
	getBenefitById
);
router.post(
	'/',
	checkJwt(),
	validatorHandler(createBenefitSchema, 'body'),
	createBenefit
);
router.patch(
	'/:id',
	checkJwt(),
	validatorHandler(updateBenefitSchema, 'body'),
	updateBenefit
);
router.delete(
	'/:id',
	checkJwt(),
	validatorHandler(getBenefitSchema, 'params'),
	deleteBenefit
);

module.exports = router;
