const Joi = require('joi');

const id = Joi.string().uuid();
const title = Joi.string().max(20);
const description = Joi.string().max(100);
const origin = Joi.string();
const destination = Joi.string();
const departureDate = Joi.date();
const returnDate = Joi.date();
const photos = Joi.array().items(Joi.string());
const price = Joi.number().precision(2);
const notes = Joi.string().max(100);
const userId = Joi.string();

const createTripSchema = Joi.object({
	title: title.required(),
	description,
	origin: origin.required(),
	destination: destination.required(),
	departureDate: departureDate.required(),
	returnDate,
	price,
	photos: photos.required(),
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
	photos: photos.optional(),
	price,
	notes,
	userId: userId.optional(),
});

const getTripSchema = Joi.object({
	id: id.required(),
});

module.exports = { createTripSchema, updateTripSchema, getTripSchema };
