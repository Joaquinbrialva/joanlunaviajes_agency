const {
	registerUser,
	getAllUsers,
	getUserById,
	updateUser,
	deleteUser,
	logIn,
} = require('../controllers/users.controller');
const { validatorHandler } = require('../middlewares/validator.handler');
const {
	createUserSchema,
	getUserSchema,
	updateUserSchema,
	loginUserSchema,
} = require('../schemas/user.schema');
const router = require('express').Router();

router.post(
	'/auth/signup',
	validatorHandler(createUserSchema, 'body'),
	registerUser
);

router.post('/auth/login', validatorHandler(loginUserSchema, 'body'), logIn);

router.get('/', getAllUsers);

router.get('/:id', validatorHandler(getUserSchema, 'params'), getUserById);

router.patch(
	'/update/:id',
	validatorHandler(getUserSchema, 'params'),
	validatorHandler(updateUserSchema, 'body'),
	updateUser
);

router.delete('/:id', validatorHandler(getUserSchema, 'params'), deleteUser);

module.exports = router;
