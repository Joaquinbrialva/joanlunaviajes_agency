const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().max(50).required();
const slug = Joi.string().max(50).required();

const createCategorySchema = Joi.object({
	id: id.optional(),
	name,
	slug,
});

const updateCategorySchema = Joi.object({
	name: Joi.string().max(50).optional(),
	slug: Joi.string().max(50).optional(),
});

const getCategorySchema = Joi.object({
	id: id.required(),
});

module.exports = {
	createCategorySchema,
	updateCategorySchema,
	getCategorySchema,
};
