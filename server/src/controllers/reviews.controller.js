const ReviewService = require('../services/review.service');
const { SUCCESS_MESSAGES } = require('../utils/messages');
const { success, created } = require('../utils/response');
const service = new ReviewService();

const getAllReviews = async (req, res, next) => {
	try {
		const reviews = await service.findAll();
		return success(res, SUCCESS_MESSAGES.DATA_FETCHED, reviews);
	} catch (error) {
		next(error);
	}
};

const getReviewById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const review = await service.findById(id);
		return success(res, SUCCESS_MESSAGES.DATA_FETCHED, review);
	} catch (error) {
		next(error);
	}
};

const createReview = async (req, res, next) => {
	try {
		const review = await service.create(req.body, req.user);
		return created(res, SUCCESS_MESSAGES.RESOURCE_CREATED, review);
	} catch (error) {
		next(error);
	}
};

const updateReview = async (req, res, next) => {
	try {
		const { id } = req.params;
		const updated = await service.update(id, req.body, req.user);
		return success(res, SUCCESS_MESSAGES.RESOURCE_UPDATED, updated);
	} catch (error) {
		next(error);
	}
};

const deleteReview = async (req, res, next) => {
	try {
		const { id } = req.params;
		await service.delete(id, req.user);
		return success(res, SUCCESS_MESSAGES.RESOURCE_DELETED, { id });
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getAllReviews,
	getReviewById,
	createReview,
	updateReview,
	deleteReview,
};
