// utils/response.js

const {
	SUCCESS_MESSAGES,
	ERROR_MESSAGES,
	AUTH_MESSAGES,
	SERVER_MESSAGES,
} = require('./messages');

/**
 * Utilidades para respuestas HTTP estandarizadas
 */

// Respuesta exitosa
const sendResponse = (
	res,
	statusCode,
	message,
	data = null, // ⬅️ CUARTO argumento (¡Aquí va la data!)
	total = undefined // ⬅️ QUINTO argumento (¡Aquí va el conteo!)
) => {
	return res.status(statusCode).json({
		success: true,
		message, // Incluye 'total' solo si está definido (perfecto)
		...(total !== undefined && { total }),
		data,
	});
};

// Respuesta de éxito (200)
const success = (
	res,
	message = SUCCESS_MESSAGES.OPERATION_SUCCESSFUL,
	data = null,
	total, // El conteo total (opcional)
	metadata = {} // Metadata adicional (paginación, redirección, etc.)
) => {
	const response = {
		success: true,
		message,
		...(total !== undefined && { total }),
		data,
		...metadata, // Incluir metadata adicional
	};

	return res.status(200).json(response);
};

// Respuesta de creación (201)
const created = (
	res,
	message = SUCCESS_MESSAGES.RESOURCE_CREATED,
	data = null
) => {
	return sendResponse(res, 201, message, data);
};

// Respuesta de error - SIEMPRE envía message como string simple
const error = (res, statusCode, message) => {
	// Asegurar que message sea siempre un string
	const errorMessage =
		typeof message === 'string' ? message : 'Error en la solicitud';

	return res.status(statusCode).json({
		success: false,
		message: errorMessage,
	});
};

// Errores comunes - todos envían solo message como string
const badRequest = (res, message = ERROR_MESSAGES.DATA_VALIDATION_FAILED) => {
	return error(res, 400, message);
};

const unauthorized = (res, message = AUTH_MESSAGES.UNAUTHORIZED) => {
	return error(res, 401, message);
};

const forbidden = (res, message = AUTH_MESSAGES.FORBIDDEN) => {
	return error(res, 403, message);
};

const notFound = (res, message = ERROR_MESSAGES.RESOURCE_NOT_FOUND) => {
	return error(res, 404, message);
};

const conflict = (res, message = 'Conflicto con el estado actual') => {
	return error(res, 409, message);
};

const internalError = (
	res,
	message = SERVER_MESSAGES.INTERNAL_SERVER_ERROR
) => {
	return error(res, 500, message);
};

// Respuesta de validación
const validationError = (
	res,
	message = ERROR_MESSAGES.DATA_VALIDATION_FAILED
) => {
	return badRequest(res, message);
};

// Respuesta de paginación
const paginated = (
	res,
	data,
	page,
	limit,
	total,
	message = SUCCESS_MESSAGES.DATA_FETCHED
) => {
	return success(res, message, {
		data,
		pagination: {
			page: parseInt(page),
			limit: parseInt(limit),
			total,
			pages: Math.ceil(total / limit),
		},
	});
};

module.exports = {
	sendResponse,
	success,
	created,
	error,
	badRequest,
	unauthorized,
	forbidden,
	notFound,
	conflict,
	internalError,
	validationError,
	paginated,
};
