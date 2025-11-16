const Joi = require('joi');

const id = Joi.string().uuid();
const userId = Joi.string().uuid();
const offerId = Joi.string().uuid();
const status = Joi.string()
	.valid('pending', 'confirmed', 'cancelled')
	.default('pending');
const passengers = Joi.number().integer().min(1).required();
const totalPrice = Joi.number().precision(2).required();

const createBookingSchema = Joi.object({
	offerId,
	passengers,
	totalPrice,
});

const updateBookingSchema = Joi.object({
	status,
	passengers,
	totalPrice,
});

const getBookingSchema = Joi.object({
	id: id.required(),
});

module.exports = { createBookingSchema, updateBookingSchema, getBookingSchema };
