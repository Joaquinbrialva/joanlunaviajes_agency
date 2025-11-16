const { models } = require('../../db/connection/connection');
const boom = require('@hapi/boom');
const { ERROR_MESSAGES, AUTH_MESSAGES } = require('../utils/messages');

class ReviewService {
	async create(data, user) {
		return await models.Review.create({
			...data,
			userId: user.sub,
		});
	}

	async findAll() {
		return await models.Review.findAll({ include: ['user', 'offer'] });
	}

	async findById(id) {
		const review = await models.Review.findByPk(id, {
			include: ['user', 'offer'],
		});
		if (!review) throw boom.notFound(ERROR_MESSAGES.RESOURCE_NOT_FOUND);
		return review;
	}

	async update(id, data, user) {
		const review = await this.findById(id);
		if (review.userId !== user.sub) {
			throw boom.forbidden(AUTH_MESSAGES.FORBIDDEN);
		}
		return await review.update(data);
	}

	async delete(id, user) {
		const review = await this.findById(id);
		if (review.userId !== user.sub) {
			throw boom.forbidden(AUTH_MESSAGES.FORBIDDEN);
		}
		await review.destroy();
		return { id };
	}
}

module.exports = ReviewService;
