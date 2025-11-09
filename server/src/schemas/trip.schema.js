const Joi = require('joi');

const id = Joi.string().uuid();
const title = Joi.string().max(50);
const origin = Joi.string();
const destination = Joi.string();
const departureDate = Joi.date();
const returnDate = Joi.date();
const isRoundTrip = Joi.boolean();
const passengers = Joi.number().integer().allow(null);
const image = Joi.string();
const price = Joi.number().precision(2).allow(null);
const description = Joi.string().max(200).allow('');
const notes = Joi.string().max(200).allow('');
const userId = Joi.string();

const createTripSchema = Joi.object({
	title: title.required(),
	description,
	origin: origin.required(),
	destination: destination.required(),
	departureDate,
	returnDate,
	isRoundTrip,
	passengers,
	price,
	image,
	notes,
	userId: userId.required(),
});

const updateTripSchema = Joi.object({
	title: title.optional(),
	description,
	origin: origin.optional(),
	destination: destination.optional(),
	departureDate,
	returnDate,
	isRoundTrip,
	passengers,
	image: image.optional(),
	price,
	notes,
	userId: userId.optional(),
});

const getTripSchema = Joi.object({
	id: id.required(),
});

module.exports = { createTripSchema, updateTripSchema, getTripSchema };
