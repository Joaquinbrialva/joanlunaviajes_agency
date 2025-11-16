const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().max(100).required();
const country = Joi.string().max(100).required();
const description = Joi.string().max(500).allow('');

const createDestinationSchema = Joi.object({
	name,
	country,
	description,
});

const updateDestinationSchema = Joi.object({
	name,
	country,
	description,
});

const getDestinationSchema = Joi.object({
	id: id.required(),
});

module.exports = {
	createDestinationSchema,
	updateDestinationSchema,
	getDestinationSchema,
};
