const UserService = require('../services/user.service');
const { SUCCESS_MESSAGES } = require('../utils/messages');
const { created, success } = require('../utils/response');
const service = new UserService();
const boom = require('@hapi/boom');

const registerUser = async (req, res, next) => {
	try {
		const { body } = req;
		const newUser = await service.create(body);
		return created(res, SUCCESS_MESSAGES.USER_CREATED, newUser);
	} catch (error) {
		next(boom.internal(error));
	}
};

const getAllUsers = async (req, res, next) => {
	try {
		const users = await service.findAll();
		return success(res, users);
	} catch (error) {
		next(boom.internal(error));
	}
};

module.exports = { registerUser, getAllUsers };
