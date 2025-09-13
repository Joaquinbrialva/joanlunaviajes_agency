const Joi = require('joi');

const id = Joi.string().uuid();
const title = Joi.string().max(20);
const origin = Joi.string();
const destination = Joi.string();
const departureDate = Joi.string();
const returnDate = Joi.string();
const photos = Joi.string();
const notes = Joi.string().max(50);
const userId = Joi.string();

const createTripSchema = Joi.object({
	id: id.required(),
	origin: origin.required(),
	destination: destination.required(),
	departureDate,
	returnDate,
	photos: photos.required(),
	notes,
	userId: userId.required(),
});

const updateTripSchema = Joi.object({
	title: title.required(),
	origin: origin.required(),
	destination: destination.required(),
	departureDate,
	returnDate,
	photos: photos.required(),
	notes,
	userId: userId.required(),
});

const getTripSchema = Joi.object({
	id: id.required(),
});

module.exports = { createTripSchema, updateTripSchema, getTripSchema };
