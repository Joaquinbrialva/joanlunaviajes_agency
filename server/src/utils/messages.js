// utils/messages.js

const SUCCESS_MESSAGES = {
	// Mensajes de operaciones exitosas
	RESOURCE_CREATED: 'Recurso creado exitosamente.',
	RESOURCE_UPDATED: 'Recurso actualizado exitosamente.',
	RESOURCE_DELETED: 'Recurso eliminado exitosamente.',
	OPERATION_SUCCESSFUL: 'Operación exitosa.',
	USER_CREATED: 'Usuario creado exitosamente.',
	DATA_FETCHED: 'Datos obtenidos exitosamente.',
};

const ERROR_MESSAGES = {
	// Errores de lógica de negocio o de datos
	RESOURCE_NOT_FOUND: 'Recurso no encontrado.',
	USER_NOT_FOUND: 'Usuario no encontrado.',
	EMAIL_ALREADY_EXISTS: 'Ya existe un usuario con este email.',
	DATA_VALIDATION_FAILED: 'Los datos proporcionados no son válidos.',
	INVALID_PARAMETERS: 'Los parámetros de la petición son inválidos.',
	PERMISSION_DENIED: 'Permiso denegado.',
	NO_TRIPS_FOUND: 'No se encontraron viajes disponibles.',
};

const AUTH_MESSAGES = {
	// Mensajes relacionados con autenticación y autorización
	INVALID_CREDENTIALS: 'Credenciales inválidas.',
	LOGGED_IN: 'Sesión iniciada',
	UNAUTHORIZED: 'No autorizado.',
	SESSION_EXPIRED: 'La sesión ha expirado. Por favor, inicia sesión de nuevo.',
	FORBIDDEN: 'Acceso prohibido. No tienes permisos para realizar esta acción.',
};

const SERVER_MESSAGES = {
	// Errores internos del servidor
	INTERNAL_SERVER_ERROR:
		'Error interno del servidor. Por favor, inténtalo de nuevo más tarde.',
	DATABASE_ERROR: 'Error al conectar o consultar la base de datos.',
};

const PASSWORD_MESSAGES = {
	// Mensajes de validación de contraseña
	PASSWORD_MIN_LENGTH: 'La contraseña debe tener al menos 8 caracteres.',
	PASSWORD_MAX_LENGTH: 'La contraseña debe tener menos de 20 caracteres.',
};

const VALIDATION_MESSAGES = {
	PHONE_REQUIRED: 'El teléfono es requerido.',
};

module.exports = {
	SUCCESS_MESSAGES,
	ERROR_MESSAGES,
	AUTH_MESSAGES,
	SERVER_MESSAGES,
	PASSWORD_MESSAGES,
	VALIDATION_MESSAGES,
};
