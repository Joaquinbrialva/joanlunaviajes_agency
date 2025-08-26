const UserService = require('../services/user.service');
const {
	SUCCESS_MESSAGES,
	AUTH_MESSAGES,
	ERROR_MESSAGES,
} = require('../utils/messages');
const { created, success, badRequest } = require('../utils/response');
const service = new UserService();
const bcrypt = require('bcrypt');

const registerUser = async (req, res, next) => {
	try {
		const { body } = req;
		const newUser = await service.create(body);
		return created(res, SUCCESS_MESSAGES.USER_CREATED, newUser);
	} catch (error) {
		next(error);
	}
};

const logIn = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const userEmail = await service.findByEmail(email);
		console.log(userEmail.password);
		const passwordMatch = await bcrypt.compare(password, userEmail.password);
		console.log(passwordMatch);
		if (!passwordMatch) {
			return badRequest(res, ERROR_MESSAGES.DATA_VALIDATION_FAILED);
		}
		return success(res, AUTH_MESSAGES.LOGGED_IN, userEmail.id);
	} catch (error) {
		next(error);
	}
};

const getAllUsers = async (req, res, next) => {
	try {
		const users = await service.findAll();
		return success(res, SUCCESS_MESSAGES.DATA_FETCHED, users);
	} catch (error) {
		next(error);
	}
};

const getUserById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const user = await service.findById(id);
		return success(res, SUCCESS_MESSAGES.DATA_FETCHED, user);
	} catch (error) {
		next(error);
	}
};

const updateUser = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { name, lastName, email, password, phone, country, city } = req.body;
		const newData = { name, lastName, email, password, phone, country, city };
		const userUpdated = await service.update(id, newData);
		return success(res, SUCCESS_MESSAGES.OPERATION_SUCCESSFUL, userUpdated);
	} catch (error) {
		next(error);
	}
};

const deleteUser = async (req, res, next) => {
	try {
		const { id } = req.params;
		await service.delete(id);
		return success(res, SUCCESS_MESSAGES.OPERATION_SUCCESSFUL, id);
	} catch (error) {
		next(error);
	}
};

module.exports = {
	registerUser,
	logIn,
	getAllUsers,
	getUserById,
	updateUser,
	deleteUser,
};
