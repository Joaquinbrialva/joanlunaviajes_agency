const router = require('express').Router();
const {
	getAllRequests,
	getRequestById,
	createRequest,
	updatedRequest,
	deleteRequest,
	findMyRequests,
} = require('../controllers/requests.controller');
const { checkJwt } = require('../middlewares/auth');
const checkRole = require('../middlewares/checkRole');
const setUserId = require('../middlewares/setUserId');
const { validatorHandler } = require('../middlewares/validator.handler');
const {
	createRequestSchema,
	updateRequestSchema,
	getRequestSchema,
} = require('../schemas/request.schema');

router.get('/', checkJwt(), checkRole('admin', 'agent'), getAllRequests);
router.get('/my-requests', checkJwt(), findMyRequests);
router.get(
	'/:requestId',
	checkJwt(),
	validatorHandler(getRequestSchema, 'params'),
	getRequestById
);
router.post(
	'/',
	checkJwt(),
	setUserId,
	validatorHandler(createRequestSchema, 'body'),
	createRequest
);
router.patch(
	'/update/:id',
	checkJwt(),
	validatorHandler(getRequestSchema, 'params'),
	validatorHandler(updateRequestSchema, 'body'),
	updatedRequest
);
router.delete(
	'/:id',
	checkJwt(),
	checkRole('admin', 'agent'),
	validatorHandler(getRequestSchema, 'params'),
	deleteRequest
);

module.exports = router;
