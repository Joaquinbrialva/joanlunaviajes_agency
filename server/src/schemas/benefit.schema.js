const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().max(100).required();
const description = Joi.string().max(500).allow('');
const active = Joi.boolean();

const createBenefitSchema = Joi.object({
	name,
	description,
	active,
});

const updateBenefitSchema = Joi.object({
	name,
	description,
	active,
});

const getBenefitSchema = Joi.object({
	id: id.required(),
});

module.exports = { createBenefitSchema, updateBenefitSchema, getBenefitSchema };
