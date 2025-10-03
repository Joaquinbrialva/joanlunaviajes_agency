const Joi = require('joi');

const id = Joi.string().uuid();
const origin = Joi.string();
const destination = Joi.string();
const departureDate = Joi.date();
const returnDate = Joi.date();
const isRoundTrip = Joi.boolean().default(false);
const passengers = Joi.number().integer().positive();
const notes = Joi.string().max(300);
const userId = Joi.string();

const createRequestSchema = Joi.object({
	origin: origin.required(),
	destination: destination.required(),
	departureDate: departureDate.required(),
	returnDate: returnDate.when('isRoundTrip', {
		is: Joi.boolean().valid(true),
		then: Joi.date().required(),
		otherwise: Joi.date().optional(),
	}),
	isRoundTrip: isRoundTrip.optional(),
	passengers: passengers.required(),
	notes: notes.optional(),
	userId: userId.required(),
});

const updateRequestSchema = Joi.object({
	origin,
	destination,
	departureDate,
	returnDate: returnDate.when('isRoundTrip', {
		is: Joi.boolean().valid(true),
		then: Joi.date().required(),
		otherwise: Joi.date().optional(),
	}),
	isRoundTrip,
	passengers,
	notes,
	userId,
});

const getRequestSchema = Joi.object({
	id: id.required(),
});

module.exports = { createRequestSchema, updateRequestSchema, getRequestSchema };
