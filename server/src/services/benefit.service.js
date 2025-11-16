const { models } = require('../../db/connection/connection');
const boom = require('@hapi/boom');
const { ERROR_MESSAGES, AUTH_MESSAGES } = require('../utils/messages');

const ROLES = { ADMIN: 'admin', AGENT: 'agent', USER: 'user' };

class BenefitService {
	#checkAuthorization(user, resourceUserId) {
		const isOverrideRole = user.role === ROLES.ADMIN;
		const isOwner = user.sub === resourceUserId;
		return isOverrideRole || isOwner;
	}

	async create(data) {
		return await models.Benefit.create(data);
	}

	async findAll() {
		return await models.Benefit.findAll();
	}

	async findById(id) {
		const benefit = await models.Benefit.findByPk(id);
		if (!benefit) throw boom.notFound(ERROR_MESSAGES.RESOURCE_NOT_FOUND);
		return benefit;
	}

	async update(id, data, user) {
		const benefit = await this.findById(id);
		if (!this.#checkAuthorization(user, benefit.userId)) {
			throw boom.forbidden(AUTH_MESSAGES.FORBIDDEN);
		}
		return await benefit.update(data);
	}

	async delete(id, user) {
		const benefit = await this.findById(id);
		if (!this.#checkAuthorization(user, benefit.userId)) {
			throw boom.forbidden(AUTH_MESSAGES.FORBIDDEN);
		}
		await benefit.destroy();
		return { id };
	}
}

module.exports = BenefitService;
