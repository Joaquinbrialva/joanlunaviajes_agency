const Joi = require('joi');

const id = Joi.string().uuid();
const title = Joi.string().max(20);
const origin = Joi.string();
const destination = Joi.string();
const departureDate = Joi.date();
const returnDate = Joi.date();
const photos = Joi.array().items(Joi.string());
const notes = Joi.string().max(50);
const userId = Joi.string();

const createTripSchema = Joi.object({
	title: title.required(),
	origin: origin.required(),
	destination: destination.required(),
	departureDate: departureDate.required(),
	returnDate,
	photos: photos.required(),
	notes,
	userId: userId.required(),
});

const updateTripSchema = Joi.object({
	title: title.optional(),
	origin: origin.optional(),
	destination: destination.optional(),
	departureDate,
	returnDate,
	photos: photos.optional(),
	notes,
	userId: userId.optional(),
});

const getTripSchema = Joi.object({
	id: id.required(),
});

module.exports = { createTripSchema, updateTripSchema, getTripSchema };
