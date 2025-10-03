const { models } = require('../../db/connection/connection');
const boom = require('@hapi/boom');
const { ERROR_MESSAGES, AUTH_MESSAGES } = require('../utils/messages');
const { Op } = require('sequelize');

// Constantes para roles
const ROLES = {
	ADMIN: 'admin',
	AGENT: 'agent',
	USER: 'user'
};

class TripService {
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
		const trip = await models.Trip.create(data);
		return trip;
	}

	async findAll(options = {}) {
		const { page = 1, limit = 10, includeUser = true, filters = {} } = options;
		
		const queryOptions = {
			limit: parseInt(limit),
			offset: (parseInt(page) - 1) * parseInt(limit),
		};

		// Aplicar filtros si existen
		if (Object.keys(filters).length > 0) {
			queryOptions.where = filters;
		}

		// Incluir usuario solo si es necesario
		if (includeUser) {
			queryOptions.include = TripService.getDefaultIncludeOptions();
		}

		const { count, rows } = await models.Trip.findAndCountAll(queryOptions);
		
		if (count === 0) throw boom.notFound(ERROR_MESSAGES.NO_TRIPS_FOUND);
		
		return { 
			data: rows, 
			total: count,
			page: parseInt(page),
			limit: parseInt(limit),
			totalPages: Math.ceil(count / parseInt(limit))
		};
	}

	async findById(id, includeUser = true) {
		const options = {};
		
		if (includeUser) {
			options.include = TripService.getDefaultIncludeOptions();
		}
		
		const trip = await models.Trip.findByPk(id, options);
		
		if (trip === null) throw boom.notFound(ERROR_MESSAGES.RESOURCE_NOT_FOUND);
		
		return trip;
	}

	async findByRoute(origin, destination, options = {}) {
		const { includeUser = false } = options;
		
		const queryOptions = {
			where: { origin, destination },
		};
		
		if (includeUser) {
			queryOptions.include = TripService.getDefaultIncludeOptions();
		}
		
		const trips = await models.Trip.findAll(queryOptions);
		
		if (trips.length === 0) {
			throw boom.notFound(ERROR_MESSAGES.RESOURCE_NOT_FOUND);
		}
		
		return trips;
	}

	async findByDate(departureDate, returnDate, options = {}) {
		const { includeUser = false } = options;
		
		const queryOptions = {
			where: {
				departureDate: { [Op.gte]: departureDate },
				returnDate: { [Op.lte]: returnDate },
			},
		};
		
		if (includeUser) {
			queryOptions.include = TripService.getDefaultIncludeOptions();
		}
		
		const trips = await models.Trip.findAll(queryOptions);
		
		if (trips.length === 0) {
			throw boom.notFound(ERROR_MESSAGES.RESOURCE_NOT_FOUND);
		}
		
		return trips;
	}

	async update(id, data, user) {
		const trip = await this.findById(id, false); // No necesitamos el usuario en la consulta
		
		// Verificar autorización usando el método privado
		if (!this.#checkAuthorization(user, trip.userId)) {
			throw boom.forbidden(AUTH_MESSAGES.FORBIDDEN);
		}
		
		const tripUpdated = await trip.update(data);
		return tripUpdated;
	}

	async delete(id, user) {
		const trip = await this.findById(id, false); // No necesitamos el usuario en la consulta
		
		// Verificar autorización usando el método privado
		if (!this.#checkAuthorization(user, trip.userId)) {
			throw boom.forbidden(AUTH_MESSAGES.FORBIDDEN);
		}
		
		await trip.destroy();
		return { id };
	}
}

module.exports = TripService;
