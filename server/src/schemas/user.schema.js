const Joi = require('joi');
const { PASSWORD_MESSAGES, VALIDATION_MESSAGES } = require('../utils/messages');

const id = Joi.number().integer().positive();
const name = Joi.string().min(2).max(50).trim();
const lastName = Joi.string().min(2).max(50).trim();
const email = Joi.string().email().trim().lowercase();
const password = Joi.string()
	.min(8)
	.message(PASSWORD_MESSAGES.PASSWORD_MIN_LENGTH)
	.max(20)
	.message(PASSWORD_MESSAGES.PASSWORD_MAX_LENGTH);
const phone = Joi.string();
const country = Joi.string().min(2).max(100).trim();
const city = Joi.string().min(2).max(100).trim();

const createUserSchema = Joi.object({
	name: name.required(),
	lastName: lastName.required(),
	email: email.required(),
	password: password.required(),
	phone: phone.required().messages({
		'any.empty': VALIDATION_MESSAGES.PHONE_REQUIRED,
		'string.empty': VALIDATION_MESSAGES.PHONE_REQUIRED,
	}),
});

const updateUserSchema = Joi.object({
	name,
	lastName,
	email,
	password,
	phone,
	country,
	city,
});

const getUserSchema = Joi.object({
	id: id.required(),
});

const loginUserSchema = Joi.object({
	email: email.required(),
	password: password.required(),
});

module.exports = {
	createUserSchema,
	updateUserSchema,
	getUserSchema,
	loginUserSchema,
};
