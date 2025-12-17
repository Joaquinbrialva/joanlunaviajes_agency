const path = require('path');

/**
 * Middleware para procesar FormData y convertir los campos al tipo correcto
 * Convierte strings JSON a objetos, strings a números/booleanos según corresponda
 */
function parseFormData(req, res, next) {
	// Si no hay body o no es FormData, continuar
	if (!req.body || Object.keys(req.body).length === 0) {
		return next();
	}

	// Procesar cada campo del body
	const parsed = {};

	for (const [key, value] of Object.entries(req.body)) {
		// Omitir solo valores null o undefined, pero mantener strings vacíos para validación
		if (value === null || value === undefined) {
			continue;
		}

		// Si es string vacío, mantenerlo (el validador lo rechazará si es requerido)
		if (value === '') {
			parsed[key] = value;
			continue;
		}

		// Intentar parsear como JSON si parece ser un array u objeto
		if (
			typeof value === 'string' &&
			(value.startsWith('[') || value.startsWith('{'))
		) {
			try {
				parsed[key] = JSON.parse(value);
			} catch (e) {
				// Si no es JSON válido, mantener como string
				parsed[key] = value;
			}
		} else {
			parsed[key] = value;
		}
	}

	// Convertir tipos específicos según el esquema de oferta
	if (parsed.price !== undefined && parsed.price !== '') {
		parsed.price = parseFloat(parsed.price);
	}
	if (parsed.nights !== undefined && parsed.nights !== '') {
		parsed.nights = parseInt(parsed.nights, 10);
	}
	// availability es opcional, solo parsear si tiene valor válido
	if (
		parsed.availability !== undefined &&
		parsed.availability !== null &&
		parsed.availability !== ''
	) {
		const parsedAvailability = parseInt(parsed.availability, 10);
		// Solo asignar si el parseo fue exitoso (no es NaN)
		if (!isNaN(parsedAvailability)) {
			parsed.availability = parsedAvailability;
		} else {
			// Si no se puede parsear, eliminar el campo (es opcional)
			delete parsed.availability;
		}
	} else if (parsed.availability === '') {
		// Si es string vacío, eliminar el campo (es opcional)
		delete parsed.availability;
	}
	if (parsed.highlighted !== undefined) {
		parsed.highlighted =
			parsed.highlighted === 'true' || parsed.highlighted === true;
	}
	if (parsed.status !== undefined) {
		parsed.status = parsed.status === 'true' || parsed.status === true;
	}
	if (parsed.isRoundTrip !== undefined) {
		parsed.isRoundTrip =
			parsed.isRoundTrip === 'true' || parsed.isRoundTrip === true;
	}

	// Procesar fechas
	if (parsed.startDate && typeof parsed.startDate === 'string') {
		parsed.startDate = new Date(parsed.startDate);
	}
	if (parsed.endDate && typeof parsed.endDate === 'string' && parsed.endDate !== '') {
		parsed.endDate = new Date(parsed.endDate);
	} else if (parsed.isRoundTrip === false && parsed.endDate === '') {
		// Si no es ida y vuelta y endDate está vacío, eliminarlo
		delete parsed.endDate;
	}

	// Procesar imágenes: si hay archivos en req.files, guardarlos y obtener sus nombres
	if (req.files && req.files.length > 0) {
		const { saveImageBuffer } = require('./multer');
		parsed.images = req.files.map((file) => {
			const filePath = saveImageBuffer(file);
			// Retornar solo el nombre del archivo relativo para guardar en la BD
			return path.basename(filePath);
		});
	} else if (!parsed.images) {
		// Si no hay imágenes y no se envió el campo, establecer como array vacío
		parsed.images = [];
	}

	req.body = parsed;
	next();
}

module.exports = parseFormData;
