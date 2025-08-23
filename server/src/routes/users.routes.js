const {
	registerUser,
	getAllUsers,
} = require('../controllers/users.controller');
const { validatorHandler } = require('../middlewares/validator.handler');
const { createUserSchema } = require('../schemas/user.schema');
const router = require('express').Router();

router.post(
	'/register',
	validatorHandler(createUserSchema, 'body'),
	registerUser
);

router.get('/', getAllUsers);

module.exports = router;
