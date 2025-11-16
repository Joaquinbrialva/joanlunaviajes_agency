const OfferService = require('../services/offer.service');
const { SUCCESS_MESSAGES } = require('../utils/messages');
const { success, created } = require('../utils/response');

const service = new OfferService();

const getAllOffers = async (req, res, next) => {
	try {
		const { page = 1, limit = 10, highlighted } = req.query;

		const filters = {};
		if (req.query.destinationId)
			filters.destinationId = req.query.destinationId;
		if (req.query.categoryId) filters.categoryId = req.query.categoryId;

		const result = await service.findAll({
			page,
			limit,
			filters,
			highlightedOnly: highlighted === 'true',
		});

		return success(
			res,
			SUCCESS_MESSAGES.DATA_FETCHED,
			result.data,
			result.total,
			result
		);
	} catch (error) {
		next(error);
	}
};

const getOfferById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const offer = await service.findById(id);
		return success(res, SUCCESS_MESSAGES.DATA_FETCHED, offer);
	} catch (error) {
		next(error);
	}
};

const createOffer = async (req, res, next) => {
	try {
		const offer = await service.create(req.body, req.user);
		return created(res, SUCCESS_MESSAGES.RESOURCE_CREATED, offer);
	} catch (error) {
		next(error);
	}
};

const updateOffer = async (req, res, next) => {
	try {
		const { id } = req.params;
		const offer = await service.update(id, req.body, req.user);
		return success(res, SUCCESS_MESSAGES.RESOURCE_UPDATED, offer);
	} catch (error) {
		next(error);
	}
};

const deleteOffer = async (req, res, next) => {
	try {
		const { id } = req.params;
		await service.delete(id, req.user);
		return success(res, SUCCESS_MESSAGES.RESOURCE_DELETED, { id });
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getAllOffers,
	getOfferById,
	createOffer,
	updateOffer,
	deleteOffer,
};
