require('dotenv').config;
const UserService = require('../services/user.service');
const {
	SUCCESS_MESSAGES,
	AUTH_MESSAGES
} = require('../utils/messages');
const { created, success } = require('../utils/response');
const service = new UserService();
//IMPLEMENTAR EDICION Y ELIMINACION DE USUARIO CON AUTENTIACION POR ID

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
		const response = await service.logIn({ email, password });
		return success(res, AUTH_MESSAGES.LOGGED_IN, response);
	} catch (error) {
		next(error);
	}
};

const getAllUsers = async (req, res, next) => {
	try {
		const { page = 1, limit = 10 } = req.query;
		const options = { page, limit };
		const result = await service.findAll(options);
		return success(res, SUCCESS_MESSAGES.DATA_FETCHED, result.data, result.total, {
			page: result.page,
			limit: result.limit,
			totalPages: result.totalPages
		});
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
		const { name, lastName, email, password, phone, country, city, role } = req.body;
		const newData = { name, lastName, email, password, phone, country, city, role };
		const user = req.user; // Usuario autenticado para verificación de autorización
		const userUpdated = await service.update(id, newData, user);
		return success(res, SUCCESS_MESSAGES.RESOURCE_UPDATED, userUpdated);
	} catch (error) {
		next(error);
	}
};

const deleteUser = async (req, res, next) => {
	try {
		const { id } = req.params;
		const user = req.user; // Usuario autenticado para verificación de autorización
		await service.delete(id, user);
		return success(res, SUCCESS_MESSAGES.RESOURCE_DELETED, { id });
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
