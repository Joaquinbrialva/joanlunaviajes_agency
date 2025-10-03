const { models } = require('../../db/connection/connection');
const boom = require('@hapi/boom');
const { ERROR_MESSAGES, AUTH_MESSAGES } = require('../utils/messages');

// Constantes para roles
const ROLES = {
	ADMIN: 'admin',
	AGENT: 'agent',
	USER: 'user'
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
		const isOverrideRole = user.role === ROLES.ADMIN || user.role === ROLES.AGENT;
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
			user = null 
		} = options;
		
		// Construir condiciones de filtrado
		const where = { ...filters };
		
		// Si se proporciona un usuario, aplicar filtro por userId
		// Esto permite tanto "mis requests" como filtros específicos
		if (user && user.sub) {
			where.userId = user.sub;
		}

		// Configurar opciones de consulta
		const queryOptions = {
			where,
			limit: parseInt(limit),
			offset: (parseInt(page) - 1) * parseInt(limit),
		};

		// Incluir usuario solo si es necesario
		if (includeUser) {
			queryOptions.include = RequestService.getDefaultIncludeOptions();
		}

		const { count, rows } = await models.Request.findAndCountAll(queryOptions);

		if (count === 0) throw boom.notFound(ERROR_MESSAGES.NO_REQUESTS_FOUND);

		return { 
			data: rows, 
			total: count,
			page: parseInt(page),
			limit: parseInt(limit),
			totalPages: Math.ceil(count / parseInt(limit))
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
