const RequestService = require('../services/request.service');
const { SUCCESS_MESSAGES } = require('../utils/messages');
const { success, created } = require('../utils/response');
const service = new RequestService();

const getAllRequests = async (req, res, next) => {
	try {
		// 1. Extraer parámetros básicos
		const { page = 1, limit = 10, includeUser } = req.query;

		// 2. Definir campos que pueden ser filtros
		const filterFields = ['origin', 'destination', 'passengers'];

		// 3. Construir filtros dinámicamente usando reduce
		const filters = filterFields.reduce((acc, field) => {
			if (req.query[field]) {
				acc[field] = req.query[field];
			}
			return acc;
		}, {});

		const serviceOptions = {
			page,
			limit,
			includeUser: includeUser !== 'false',
			filters,
		};

		const result = await service.findAll(serviceOptions);
		return success(
			res,
			SUCCESS_MESSAGES.DATA_FETCHED,
			result.data,
			result.total,
			{
				page: result.page,
				limit: result.limit,
				totalPages: result.totalPages,
				...(result.wasRedirected && {
					requestedPage: result.requestedPage,
					correctedToPage: result.correctedToPage,
					wasRedirected: result.wasRedirected
				})
			}
		);
	} catch (error) {
		next(error);
	}
};

const getRequestById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const user = req.user; // Cambio: usar req.user directamente en lugar de req.user.user
		const request = await service.findByIdAuthorized(id, user);
		return success(res, SUCCESS_MESSAGES.DATA_FETCHED, request);
	} catch (error) {
		next(error);
	}
};

const findMyRequests = async (req, res, next) => {
	try {
		const user = req.user;
		const { page = 1, limit = 10, includeUser } = req.query;

		// Definir campos que pueden ser filtros
		const filterFields = ['origin', 'destination', 'passengers'];

		// Construir filtros dinámicamente
		const filters = filterFields.reduce((acc, field) => {
			if (req.query[field]) {
				acc[field] = req.query[field];
			}
			return acc;
		}, {});

		const options = {
			page,
			limit,
			includeUser: includeUser !== 'false',
			filters,
			user, // Pasar user = filtrar por MIS requests
		};

		const result = await service.findAll(options);
		return success(
			res,
			SUCCESS_MESSAGES.DATA_FETCHED,
			result.data,
			result.total,
			{
				...result,
			}
		);
	} catch (error) {
		next(error);
	}
};

const createRequest = async (req, res, next) => {
	try {
		const { body } = req;
		const newRequest = await service.create(body);
		return created(res, SUCCESS_MESSAGES.RESOURCE_CREATED, newRequest);
	} catch (error) {
		next(error);
	}
};

const updatedRequest = async (req, res, next) => {
	try {
		const { id } = req.params;
		const user = req.user; // Cambio: usar req.user directamente en lugar de req.user
		const {
			origin,
			destination,
			departureDate,
			returnDate,
			isRoundTrip,
			passengers,
			notes,
		} = req.body;
		const newData = {
			origin,
			destination,
			departureDate,
			returnDate,
			isRoundTrip,
			passengers,
			notes,
		};
		const updatedRequest = await service.update(id, newData, user);
		return success(res, SUCCESS_MESSAGES.RESOURCE_UPDATED, updatedRequest);
	} catch (error) {
		next(error);
	}
};

const deleteRequest = async (req, res, next) => {
	try {
		const { id } = req.params;
		const user = req.user; // Cambio: usar req.user directamente en lugar de req.user
		await service.delete(id, user);
		return success(res, SUCCESS_MESSAGES.RESOURCE_DELETED, { id });
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getAllRequests,
	getRequestById,
	findMyRequests,
	createRequest,
	updatedRequest,
	deleteRequest,
};
