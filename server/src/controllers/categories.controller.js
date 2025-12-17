const CategoryService = require('../services/category.service');
const { SUCCESS_MESSAGES } = require('../utils/messages');
const { success, created } = require('../utils/response');
const service = new CategoryService();

const getAllCategories = async (req, res, next) => {
	try {
		const categories = await service.findAll();
		return success(res, SUCCESS_MESSAGES.CATEGORIES_FETCHED, categories);
	} catch (error) {
		next(error);
	}
};

const getCategoryById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const category = await service.findById(id);
		return success(res, SUCCESS_MESSAGES.CATEGORY_FETCHED, category);
	} catch (error) {
		next(error);
	}
};

const createCategory = async (req, res, next) => {
	try {
		const body = req.body;
		const category = await service.create(body);
		return created(res, SUCCESS_MESSAGES.CATEGORY_CREATED, category);
	} catch (error) {
		next(error);
	}
};

const updateCategory = async (req, res, next) => {
	try {
		const { id } = req.params;
		const body = req.body;
		const category = await service.update(id, body);
		return success(res, SUCCESS_MESSAGES.CATEGORY_UPDATED, category);
	} catch (error) {
		next(error);
	}
};

const deleteCategory = async (req, res, next) => {
	try {
		const { id } = req.params;
		const result = await service.delete(id);
		return success(res, SUCCESS_MESSAGES.CATEGORY_DELETED, result);
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getAllCategories,
	getCategoryById,
	createCategory,
	updateCategory,
	deleteCategory,
};
