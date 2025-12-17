// utils/messages.js

const SUCCESS_MESSAGES = {
	// Mensajes de operaciones exitosas
	DATA_FETCHED: 'Datos obtenidos exitosamente.',
	USER_CREATED: 'Usuario creado exitosamente.',
	USER_FETCHED: 'Usuario obtenido exitosamente.',
	USER_UPDATED: 'Usuario actualizado exitosamente.',
	USER_DELETED: 'Usuario eliminado exitosamente.',
	CATEGORIES_FETCHED: 'Categorías obtenidas exitosamente.',
	CATEGORIE_FETCHED: 'Categoría obtenida exitosamente.',
	CATEGORY_CREATED: 'Categoría creada exitosamente.',
	CATEGORY_UPDATED: 'Categoría actualizada exitosamente.',
	CATEGORY_DELETED: 'Categoría eliminada exitosamente.',
	BENEFITS_FETCHED: 'Beneficios obtenidos exitosamente.',
	BENEFIT_FETCHED: 'Beneficio obtenido exitosamente.',
	BENEFIT_CREATED: 'Beneficio creado exitosamente.',
	BENEFIT_UPDATED: 'Beneficio actualizado exitosamente.',
	BENEFIT_DELETED: 'Beneficio eliminado exitosamente.',
	BOOKINGS_FETCHED: 'Reservas obtenidas exitosamente.',
	BOOKING_FETCHED: 'Reserva obtenida exitosamente.',
	BOOKING_CREATED: 'Reserva creada exitosamente.',
	BOOKING_UPDATED: 'Reserva actualizada exitosamente.',
	BOOKING_DELETED: 'Reserva eliminada exitosamente.',
	DESTINATIONS_FETCHED: 'Destinos obtenidos exitosamente.',
	DESTINATION_FETCHED: 'Destino obtenido exitosamente.',
	DESTINATION_CREATED: 'Destino creado exitosamente.',
	DESTINATION_UPDATED: 'Destino actualizado exitosamente.',
	DESTINATION_DELETED: 'Destino eliminado exitosamente.',
	OFFERS_FETCHED: 'Ofertas obtenidas exitosamente.',
	OFFER_FETCHED: 'Oferta obtenida exitosamente.',
	OFFER_CREATED: 'Oferta creada exitosamente.',
	OFFER_UPDATED: 'Oferta actualizada exitosamente.',
	OFFER_DELETED: 'Oferta eliminada exitosamente.',
	REVIEWS_FETCHED: 'Reseñas obtenidas exitosamente.',
	REVIEW_FETCHED: 'Reseña obtenida exitosamente.',
	REVIEW_CREATED: 'Reseña creada exitosamente.',
	REVIEW_UPDATED: 'Reseña actualizada exitosamente.',
	REVIEW_DELETED: 'Reseña eliminada exitosamente.',
};

const ERROR_MESSAGES = {
	// Errores de lógica de negocio o de datos
	RESOURCE_NOT_FOUND: 'Recurso no encontrado.',
	USER_NOT_FOUND: 'Usuario no encontrado.',
	DATA_VALIDATION_FAILED: 'Los datos proporcionados no son válidos.',
	INVALID_PARAMETERS: 'Los parámetros de la petición son inválidos.',
	PERMISSION_DENIED: 'Permiso denegado.',
	NO_TRIPS_FOUND: 'No se encontraron viajes disponibles.',
	NO_REQUESTS_FOUND: 'No se encontraron solicitudes',
};

const AUTH_MESSAGES = {
	// Mensajes relacionados con autenticación y autorización
	EMAIL_ALREADY_EXISTS: 'Ya existe un usuario con este email.',
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
