const DestinationService = require('../services/destination.service');
const { SUCCESS_MESSAGES } = require('../utils/messages');
const { success, created } = require('../utils/response');
const service = new DestinationService();

const getAllDestinations = async (req, res, next) => {
	try {
		const destinations = await service.findAll();
		return success(res, SUCCESS_MESSAGES.DATA_FETCHED, destinations);
	} catch (error) {
		next(error);
	}
};

const getDestinationById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const destination = await service.findById(id);
		return success(res, SUCCESS_MESSAGES.DATA_FETCHED, destination);
	} catch (error) {
		next(error);
	}
};

const createDestination = async (req, res, next) => {
	try {
		const destination = await service.create(req.body);
		return created(res, SUCCESS_MESSAGES.RESOURCE_CREATED, destination);
	} catch (error) {
		next(error);
	}
};

const updateDestination = async (req, res, next) => {
	try {
		const { id } = req.params;
		const updated = await service.update(id, req.body);
		return success(res, SUCCESS_MESSAGES.RESOURCE_UPDATED, updated);
	} catch (error) {
		next(error);
	}
};

const deleteDestination = async (req, res, next) => {
	try {
		const { id } = req.params;
		await service.delete(id);
		return success(res, SUCCESS_MESSAGES.RESOURCE_DELETED, { id });
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getAllDestinations,
	getDestinationById,
	createDestination,
	updateDestination,
	deleteDestination,
};
