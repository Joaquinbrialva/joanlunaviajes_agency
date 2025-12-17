const Joi = require('joi');

// Mensajes de validación en español
const messages = {
	'string.empty': '{{#label}} es requerido',
	'string.max': '{{#label}} no debe exceder {{#limit}} caracteres',
	'number.base': '{{#label}} debe ser un número',
	'number.min': '{{#label}} debe ser mayor o igual a {{#limit}}',
	'number.integer': '{{#label}} debe ser un número entero',
	'date.base': '{{#label}} debe ser una fecha válida',
	'boolean.base': '{{#label}} debe ser verdadero o falso',
	'any.required': '{{#label}} es requerido',
	'string.uuid': '{{#label}} debe ser un UUID válido',
	'array.base': '{{#label}} debe ser un array',
};

const id = Joi.string().uuid().messages(messages);
const title = Joi.string().max(100).messages(messages);
const description = Joi.string().max(500).allow('').messages(messages);
const price = Joi.number().min(0).messages(messages);
const currency = Joi.string().max(10).messages(messages);
const nights = Joi.number().integer().min(1).messages(messages);
const startDate = Joi.date().messages(messages);
const endDate = Joi.date().messages(messages);
const availability = Joi.number().integer().min(0).messages(messages);
const highlighted = Joi.boolean().messages(messages);
const included = Joi.array().items(Joi.string()).messages(messages);
const notIncluded = Joi.array().items(Joi.string()).messages(messages);
const policies = Joi.string().max(500).allow('').messages(messages);
const images = Joi.array().items(Joi.string()).messages(messages);
const origin = Joi.string().max(100).allow('').messages(messages);
const destinationId = Joi.string().uuid().messages(messages);
const categoryId = Joi.string().uuid().messages(messages);
const userId = Joi.string().uuid().messages(messages);
const status = Joi.boolean().messages(messages);
const isRoundTrip = Joi.boolean().messages(messages);

const createOfferSchema = Joi.object({
	title: title.required().label('El título'),
	description: description.label('La descripción'),
	price: price.required().label('El precio'),
	currency: currency.label('La moneda'),
	nights: nights.required().label('Las noches'),
	startDate: startDate.required().label('La fecha de inicio'),
	endDate: endDate.when('isRoundTrip', {
		is: true,
		then: Joi.required().label('La fecha de fin'),
		otherwise: Joi.optional().allow(null, '').label('La fecha de fin'),
	}),
	availability: availability.label('La disponibilidad'),
	highlighted: highlighted.label('Destacado'),
	included: included.label('Incluye'),
	notIncluded: notIncluded.label('No incluye'),
	isRoundTrip: isRoundTrip.label('Ida y vuelta'),
	policies: policies.label('Las políticas'),
	images: images.label('Las imágenes'),
	origin: origin.label('El origen'),
	destinationId: destinationId.required().label('El destino'),
	status: status.required().label('El estado'),
	categoryId: categoryId.required().label('La categoría'),
	userId: userId.required().label('El usuario'),
});

const updateOfferSchema = Joi.object({
	title: title.label('El título'),
	description: description.label('La descripción'),
	price: price.label('El precio'),
	currency: currency.label('La moneda'),
	nights: nights.label('Las noches'),
	startDate: startDate.label('La fecha de inicio'),
	endDate: endDate.when('isRoundTrip', {
		is: true,
		then: Joi.required().label('La fecha de fin'),
		otherwise: Joi.optional().allow(null, '').label('La fecha de fin'),
	}),
	availability: availability.label('La disponibilidad'),
	highlighted: highlighted.label('Destacado'),
	included: included.label('Incluye'),
	notIncluded: notIncluded.label('No incluye'),
	isRoundTrip: isRoundTrip.label('Ida y vuelta'),
	policies: policies.label('Las políticas'),
	images: images.label('Las imágenes'),
	origin: origin.label('El origen'),
	destinationId: destinationId.label('El destino'),
	categoryId: categoryId.label('La categoría'),
	userId: userId.label('El usuario'),
	status: status.label('El estado'),
});

const getOfferSchema = Joi.object({
	id: id.required(),
});

module.exports = { createOfferSchema, updateOfferSchema, getOfferSchema };
