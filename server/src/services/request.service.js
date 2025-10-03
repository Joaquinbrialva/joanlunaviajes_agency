const { models } = require('../../db/connection/connection');
const boom = require('@hapi/boom');
const { ERROR_MESSAGES, AUTH_MESSAGES } = require('../utils/messages');
const { Op } = require('sequelize');

// Constantes para roles
const ROLES = {
	ADMIN: 'admin',
	AGENT: 'agent',
	USER: 'user',
};

class RequestService {
	// Configuración común para includes
	static getDefaultIncludeOptions() {
		return [
			{
				association: 'user',
				attributes: {
					exclude: ['password'],
				},
			},
		];
	}

	// Método privado para verificar autorización
	#checkAuthorization(user, resourceUserId) {
		const isOverrideRole =
			user.role === ROLES.ADMIN || user.role === ROLES.AGENT;
		const isOwner = user.sub === resourceUserId;
		return isOverrideRole || isOwner;
	}

	async create(data) {
		const request = await models.Request.create(data);
		return request;
	}

	async findAll(options = {}) {
		const {
			page = 1,
			limit = 10,
			includeUser = true,
			filters = {},
			user = null,
		} = options;

		// 1. Inicializar WHERE con una copia de los filtros de búsqueda
		const where = { ...filters };

		// 2. Lógica para transformar filtros de texto a búsqueda flexible (Op.iLike)
		// Definimos qué campos deben ser buscados de forma flexible
		const flexibleSearchFields = ['origin', 'destination', 'notes']; // Añade más campos si lo necesitas

		for (const key of flexibleSearchFields) {
			// Chequeamos si el filtro existe en los parámetros
			if (filters[key]) {
				const searchTerm = filters[key];

				// Reemplazamos el valor de la clave con la estructura de Op.iLike
				where[key] = {
					[Op.iLike]: `%${searchTerm}%`, // ⬅️ Búsqueda parcial e insensible a mayúsculas
				};
			}
		}

		// 3. Aplicar filtro de autorización por userId (si existe)
		if (user && user.sub) {
			where.userId = user.sub;
		}

		// Configurar opciones de consulta (Paginación)
		const queryOptions = {
			where,
			limit: parseInt(limit),
			offset: (parseInt(page) - 1) * parseInt(limit),
		};

		// Incluir usuario
		if (includeUser) {
			queryOptions.include = RequestService.getDefaultIncludeOptions();
		}

		const { count, rows } = await models.Request.findAndCountAll(queryOptions);

		if (count === 0) throw boom.notFound(ERROR_MESSAGES.NO_REQUESTS_FOUND);

		// Calcular metadatos de paginación
		const totalPages = Math.ceil(count / parseInt(limit));
		const currentPage = parseInt(page);

		// Si la página solicitada no existe, redirigir automáticamente a página 1
		if (currentPage > totalPages && totalPages > 0) {
			// Crear nuevas opciones con página 1
			const correctedOptions = { ...options, page: 1 };
			const correctedResult = await this.findAll(correctedOptions);
			
			// Agregar metadatos de redirección para transparencia
			return {
				...correctedResult,
				requestedPage: currentPage,  // Página que pidió originalmente
				correctedToPage: 1,          // Página a la que se redirigió
				wasRedirected: true          // Flag para indicar redirección
			};
		}

		// Devolver la respuesta paginada y estructurada
		return {
			data: rows,
			total: count,
			page: currentPage,
			limit: parseInt(limit),
			totalPages,
		};
	}

	async findByIdAuthorized(requestId, user) {
		const options = {
			include: RequestService.getDefaultIncludeOptions(),
		};

		const request = await models.Request.findByPk(requestId, options);

		if (request === null) throw boom.notFound(ERROR_MESSAGES.NO_REQUESTS_FOUND);

		// Verificar autorización usando el método privado
		if (!this.#checkAuthorization(user, request.userId)) {
			throw boom.forbidden(AUTH_MESSAGES.FORBIDDEN);
		}

		return request;
	}

	async update(id, data, user) {
		const request = await models.Request.findByPk(id);

		if (request === null) throw boom.notFound(ERROR_MESSAGES.NO_REQUESTS_FOUND);

		// Verificar autorización usando el método privado
		if (!this.#checkAuthorization(user, request.userId)) {
			throw boom.forbidden(AUTH_MESSAGES.FORBIDDEN);
		}

		const requestUpdated = await request.update(data);
		return requestUpdated;
	}

	async delete(id, user) {
		const request = await models.Request.findByPk(id);

		if (request === null) throw boom.notFound(ERROR_MESSAGES.NO_REQUESTS_FOUND);

		// Verificar autorización usando el método privado
		if (!this.#checkAuthorization(user, request.userId)) {
			throw boom.forbidden(AUTH_MESSAGES.FORBIDDEN);
		}

		await request.destroy();
		return { id };
	}
}

module.exports = RequestService;
