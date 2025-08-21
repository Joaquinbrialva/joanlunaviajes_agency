/**
 * Archivo de constantes para mensajes de error y otros valores reutilizables.
 */

const ERROR_MESSAGES = {
	NOT_FOUND: 'Recurso no encontrado.',
	UNAUTHORIZED: 'No autorizado.',
	FORBIDDEN: 'Acceso prohibido.',
	BAD_REQUEST: 'Solicitud incorrecta.',
	INTERNAL_ERROR: 'Error interno del servidor.',
	VALIDATION_ERROR: 'Error de validación de datos.',
	MISSING_FIELDS: 'Faltan campos requeridos.',
	INVALID_CREDENTIALS: 'Credenciales inválidas.',
	USER_EXISTS: 'El usuario ya existe.',
	USER_NOT_FOUND: 'Usuario no encontrado.',
};

const STATUS_CODES = {
	OK: 200,
	CREATED: 201,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	INTERNAL_ERROR: 500,
};

const ROLES = {
	ADMIN: 'admin',
	USER: 'user',
	GUEST: 'guest',
};

const DEFAULTS = {
	PAGINATION_LIMIT: 10,
	PAGINATION_OFFSET: 0,
};

module.exports = {
	ERROR_MESSAGES,
	STATUS_CODES,
	ROLES,
	DEFAULTS,
};
