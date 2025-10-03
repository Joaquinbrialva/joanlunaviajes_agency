const { ValidationError } = require('sequelize');
const { error } = require('../utils/response');

function logErrors(err, req, res, next) {
	// Aquí se podría guardar el error en un log externo como Sentry
	console.error(err);
	next(err);
}

function ormErrorHandler(err, req, res, next) {
	if (err instanceof ValidationError) {
		return error(res, 409, err.name, err.errors);
	} else {
		next(err);
	}
}

function boomErrorHandler(err, req, res, next) {
	if (err.isBoom) {
		const { output } = err;
		return error(res, output.statusCode, output.payload);
	} else {
		next(err);
	}
}

function errorHandler(err, req, res, next) {
	return error(res, 500, err.message, err.stack);
}

module.exports = {
	logErrors,
	ormErrorHandler,
	boomErrorHandler,
	errorHandler,
};
