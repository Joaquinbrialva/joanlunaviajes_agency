const BenefitService = require('../services/benefit.service');
const { SUCCESS_MESSAGES } = require('../utils/messages');
const { success, created } = require('../utils/response');
const service = new BenefitService();

const getAllBenefits = async (req, res, next) => {
	try {
		const benefits = await service.findAll();
		return success(res, SUCCESS_MESSAGES.DATA_FETCHED, benefits);
	} catch (error) {
		next(error);
	}
};

const getBenefitById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const benefit = await service.findById(id);
		return success(res, SUCCESS_MESSAGES.DATA_FETCHED, benefit);
	} catch (error) {
		next(error);
	}
};

const createBenefit = async (req, res, next) => {
	try {
		const benefit = await service.create(req.body);
		return created(res, SUCCESS_MESSAGES.RESOURCE_CREATED, benefit);
	} catch (error) {
		next(error);
	}
};

const updateBenefit = async (req, res, next) => {
	try {
		const { id } = req.params;
		const updated = await service.update(id, req.body, req.user);
		return success(res, SUCCESS_MESSAGES.RESOURCE_UPDATED, updated);
	} catch (error) {
		next(error);
	}
};

const deleteBenefit = async (req, res, next) => {
	try {
		const { id } = req.params;
		await service.delete(id, req.user);
		return success(res, SUCCESS_MESSAGES.RESOURCE_DELETED, { id });
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getAllBenefits,
	getBenefitById,
	createBenefit,
	updateBenefit,
	deleteBenefit,
};
