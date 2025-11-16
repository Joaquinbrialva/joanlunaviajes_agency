const Joi = require('joi');

const id = Joi.string().uuid();
const title = Joi.string().max(100);
const description = Joi.string().max(500).allow('');
const price = Joi.number().min(0);
const currency = Joi.string().max(10);
const nights = Joi.number().integer().min(1);
const startDate = Joi.date();
const endDate = Joi.date();
const availability = Joi.number().integer().min(0);
const highlighted = Joi.boolean();
const included = Joi.array().items(Joi.string());
const notIncluded = Joi.array().items(Joi.string());
const policies = Joi.string().max(500).allow('');
const images = Joi.array().items(Joi.string());
const destinationId = Joi.number().integer();
const categoryId = Joi.number().integer();
const agentId = Joi.number().integer();

const createOfferSchema = Joi.object({
	title: title.required(),
	description,
	price: price.required(),
	currency,
	nights: nights.required(),
	startDate: startDate.required(),
	endDate: endDate.required(),
	availability,
	highlighted,
	included,
	notIncluded,
	policies,
	images,
	destinationId: destinationId.required(),
	categoryId: categoryId.required(),
	agentId: agentId.required(),
});

const updateOfferSchema = Joi.object({
	title,
	description,
	price,
	currency,
	nights,
	startDate,
	endDate,
	availability,
	highlighted,
	included,
	notIncluded,
	policies,
	images,
	destinationId,
	categoryId,
	agentId,
});

const getOfferSchema = Joi.object({
	id: id.required(),
});

module.exports = { createOfferSchema, updateOfferSchema, getOfferSchema };
