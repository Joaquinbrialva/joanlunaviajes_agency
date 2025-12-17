const boom = require('@hapi/boom');

function validatorHandler(schema, property) {
	return (req, res, next) => {
		const data = req[property];
		const { error } = schema.validate(data, {
			abortEarly: false,
			messages: {
				wrap: {
					label: '', // Label vacío para no mostrar el nombre del campo con comillas
				},
			},
		});
		if (error) {
			// Extraer mensajes de error de Joi de forma consistente
			const errorMessages = error.details
				.map((detail) => detail.message)
				.join('. ');
			// Crear un mensaje de error más legible
			const message = errorMessages || 'Error de validación';
			next(boom.badRequest(message));
		} else {
			next();
		}
	};
}

module.exports = { validatorHandler };
