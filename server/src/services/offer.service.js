const { models } = require('../../db/connection/connection');
const boom = require('@hapi/boom');
const { ERROR_MESSAGES, AUTH_MESSAGES } = require('../utils/messages');
const { Op } = require('sequelize');

const ROLES = {
	ADMIN: 'admin',
	AGENT: 'agent',
	USER: 'user',
};

class OfferService {
	static getDefaultIncludeOptions() {
		return [
			{ association: 'destination' },
			{ association: 'category' },
			{ association: 'user', attributes: { exclude: ['password'] } },
			{ association: 'reviews' },
		];
	}

	#checkAuthorization(user, resourceUserId) {
		const isOverrideRole =
			user.role === ROLES.ADMIN || user.role === ROLES.AGENT;
		const isOwner = user.sub === resourceUserId;
		return isOverrideRole || isOwner;
	}

	async create(data, user) {
		return await models.Offer.create({
			...data,
			userId: user.sub,
		});
	}

	async findAll(options = {}) {
		const {
			page = 1,
			limit = 10,
			filters = {},
			highlightedOnly = false,
			includeAll = true,
		} = options;

		const queryOptions = {
			where: {},
			limit: parseInt(limit),
			offset: (page - 1) * limit,
		};

		if (filters.destinationId)
			queryOptions.where.destinationId = filters.destinationId;
		if (filters.categoryId) queryOptions.where.categoryId = filters.categoryId;
		if (highlightedOnly) queryOptions.where.highlighted = true;

		if (includeAll)
			queryOptions.include = OfferService.getDefaultIncludeOptions();

		const { count, rows } = await models.Offer.findAndCountAll(queryOptions);

		return {
			data: rows,
			total: count,
			page,
			limit,
			totalPages: Math.ceil(count / limit),
		};
	}

	async findById(id, includeAll = true) {
		const options = {};
		if (includeAll) options.include = OfferService.getDefaultIncludeOptions();

		const offer = await models.Offer.findByPk(id, options);
		if (!offer) throw boom.notFound(ERROR_MESSAGES.RESOURCE_NOT_FOUND);

		return offer;
	}

	async update(id, data, user) {
		const offer = await this.findById(id, false);

		if (!this.#checkAuthorization(user, offer.agentId)) {
			throw boom.forbidden(AUTH_MESSAGES.FORBIDDEN);
		}

		return await offer.update(data);
	}

	async delete(id, user) {
		const offer = await this.findById(id, false);

		if (!this.#checkAuthorization(user, offer.agentId)) {
			throw boom.forbidden(AUTH_MESSAGES.FORBIDDEN);
		}

		await offer.destroy();
		return { id };
	}
}

module.exports = OfferService;
