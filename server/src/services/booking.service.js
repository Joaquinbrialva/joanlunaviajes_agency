const { models } = require('../../db/connection/connection');
const boom = require('@hapi/boom');
const { ERROR_MESSAGES, AUTH_MESSAGES } = require('../utils/messages');

const ROLES = { ADMIN: 'admin', AGENT: 'agent', USER: 'user' };

class BookingService {
	#checkAuthorization(user, resourceUserId) {
		const isOverrideRole =
			user.role === ROLES.ADMIN || user.role === ROLES.AGENT;
		const isOwner = user.sub === resourceUserId;
		return isOverrideRole || isOwner;
	}

	async create(data, user) {
		return await models.Booking.create({
			...data,
			userId: user.sub,
		});
	}

	async findAll() {
		return await models.Booking.findAll({
			include: ['offer', 'user'],
		});
	}

	async findById(id) {
		const booking = await models.Booking.findByPk(id, {
			include: ['offer', 'user'],
		});
		if (!booking) throw boom.notFound(ERROR_MESSAGES.RESOURCE_NOT_FOUND);
		return booking;
	}

	async update(id, data, user) {
		const booking = await this.findById(id);
		if (!this.#checkAuthorization(user, booking.userId)) {
			throw boom.forbidden(AUTH_MESSAGES.FORBIDDEN);
		}
		return await booking.update(data);
	}

	async delete(id, user) {
		const booking = await this.findById(id);
		if (!this.#checkAuthorization(user, booking.userId)) {
			throw boom.forbidden(AUTH_MESSAGES.FORBIDDEN);
		}
		await booking.destroy();
		return { id };
	}
}

module.exports = BookingService;
