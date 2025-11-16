const Joi = require('joi');

const id = Joi.string().uuid();
const rating = Joi.number().integer().min(1).max(5).required();
const comment = Joi.string().max(500).allow('');
const offerId = Joi.string().uuid().required();

const createReviewSchema = Joi.object({
	rating,
	comment,
	offerId,
});

const updateReviewSchema = Joi.object({
	rating,
	comment,
});

const getReviewSchema = Joi.object({
	id: id.required(),
});

module.exports = { createReviewSchema, updateReviewSchema, getReviewSchema };
