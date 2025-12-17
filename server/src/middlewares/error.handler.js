const { ValidationError } = require('sequelize');
const { error } = require('../utils/response');

function logErrors(err, req, res, next) {
	// Aquí se podría guardar el error en un log externo como Sentry
	console.error(err);
	next(err);
}

function ormErrorHandler(err, req, res, next) {
	if (err instanceof ValidationError) {
		// Sequelize ValidationError -> extraer mensaje simple
		const message = err.message || 'Error de validación';
		return error(res, 409, message);
	}
	return next(err);
}

function boomErrorHandler(err, req, res, next) {
	if (err && err.isBoom) {
		const { output } = err;
		const payload = output.payload || {};

		// Extraer mensaje como string simple
		let message = 'Error en la solicitud';

		if (typeof payload.message === 'string') {
			message = payload.message;
		} else if (payload.message && typeof payload.message === 'object') {
			// Si message es un objeto, intentar extraer el mensaje
			message = payload.message.message || payload.message.error || message;
		} else if (payload.error) {
			message = typeof payload.error === 'string' ? payload.error : message;
		}

		return error(res, output.statusCode || 400, message);
	}
	return next(err);
}

function errorHandler(err, req, res, next) {
	// Extraer mensaje simple del error
	let message = 'Error interno del servidor';

	if (err && err.message) {
		if (typeof err.message === 'string') {
			message = err.message;
		} else if (typeof err.message === 'object' && err.message.message) {
			message = err.message.message;
		}
	}

	return error(res, 500, message);
}

module.exports = {
	logErrors,
	ormErrorHandler,
	boomErrorHandler,
	errorHandler,
};
